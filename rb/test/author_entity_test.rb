# Author entity test

require "minitest/autorun"
require "json"
require_relative "../GameOfThronesQuotes_sdk"
require_relative "runner"

class AuthorEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GameOfThronesQuotesSDK.test(nil, nil)
    ent = testsdk.Author(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GameOfThronesQuotesConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GameOfThronesQuotesSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Author(nil).list({ "character" => 1, "count" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = author_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "author." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["character01", "count01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    author_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.author")))
    author_ref01_data = nil
    if author_ref01_data_raw.length > 0
      author_ref01_data = Helpers.to_map(author_ref01_data_raw[0][1])
    end

    # LIST
    author_ref01_ent = client.Author(nil)
    author_ref01_match = {
      "character" => setup[:idmap]["character01"],
      "count" => setup[:idmap]["count01"],
    }

    author_ref01_list_result = author_ref01_ent.list(author_ref01_match, nil)
    assert author_ref01_list_result.is_a?(Array)

  end
end

def author_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "author", "AuthorTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GameOfThronesQuotesSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["author01", "author02", "author03", "character01", "count01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID" => idmap,
    "GAME_OF_THRONES_QUOTES_TEST_LIVE" => "FALSE",
    "GAME_OF_THRONES_QUOTES_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = GameOfThronesQuotesSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GAME_OF_THRONES_QUOTES_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
