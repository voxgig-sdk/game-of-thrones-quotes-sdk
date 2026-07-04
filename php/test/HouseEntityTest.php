<?php
declare(strict_types=1);

// House entity test

require_once __DIR__ . '/../gameofthronesquotes_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class HouseEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GameOfThronesQuotesSDK::test(null, null);
        $ent = $testsdk->House(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = house_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "house." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GAMEOFTHRONESQUOTES_TEST_HOUSE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $house_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.house")));
        $house_ref01_data = null;
        if (count($house_ref01_data_raw) > 0) {
            $house_ref01_data = Helpers::to_map($house_ref01_data_raw[0][1]);
        }

        // LIST
        $house_ref01_ent = $client->House(null);
        $house_ref01_match = [];

        $house_ref01_list_result = $house_ref01_ent->list($house_ref01_match, null);
        $this->assertIsArray($house_ref01_list_result);

        // LOAD
        $house_ref01_match_dt0 = [];
        $house_ref01_data_dt0_loaded = $house_ref01_ent->load($house_ref01_match_dt0, null);
        $this->assertNotNull($house_ref01_data_dt0_loaded);

    }
}

function house_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/house/HouseTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameOfThronesQuotesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["house01", "house02", "house03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GAMEOFTHRONESQUOTES_TEST_HOUSE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAMEOFTHRONESQUOTES_TEST_HOUSE_ENTID" => $idmap,
        "GAMEOFTHRONESQUOTES_TEST_LIVE" => "FALSE",
        "GAMEOFTHRONESQUOTES_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAMEOFTHRONESQUOTES_TEST_HOUSE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GAMEOFTHRONESQUOTES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new GameOfThronesQuotesSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GAMEOFTHRONESQUOTES_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GAMEOFTHRONESQUOTES_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
