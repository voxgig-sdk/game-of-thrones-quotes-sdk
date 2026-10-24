<?php
declare(strict_types=1);

// Author entity test

require_once __DIR__ . '/../gameofthronesquotes_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AuthorEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = GameOfThronesQuotesSDK::test(null, null);
        $ent = $testsdk->Author(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = GameOfThronesQuotesConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = GameOfThronesQuotesSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Author(null)->list(["character" => 1, "count" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = author_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "author." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["character01", "count01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $author_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.author")));
        $author_ref01_data = null;
        if (count($author_ref01_data_raw) > 0) {
            $author_ref01_data = Helpers::to_map($author_ref01_data_raw[0][1]);
        }

        // LIST
        $author_ref01_ent = $client->Author(null);
        $author_ref01_match = [
            "character" => $setup["idmap"]["character01"],
            "count" => $setup["idmap"]["count01"],
        ];

        $author_ref01_list_result = $author_ref01_ent->list($author_ref01_match, null);
        $this->assertIsArray($author_ref01_list_result);

    }
}

function author_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/author/AuthorTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameOfThronesQuotesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["author01", "author02", "author03", "character01", "count01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID" => $idmap,
        "GAME_OF_THRONES_QUOTES_TEST_LIVE" => "FALSE",
        "GAME_OF_THRONES_QUOTES_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new GameOfThronesQuotesSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GAME_OF_THRONES_QUOTES_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
