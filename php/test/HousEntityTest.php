<?php
declare(strict_types=1);

// Hous entity test

require_once __DIR__ . '/../gameofthronesquotes_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class HousEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GameOfThronesQuotesSDK::test(null, null);
        $ent = $testsdk->Hous(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = hous_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "hous." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GAMEOFTHRONESQUOTES_TEST_HOUS_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $hous_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.hous")));
        $hous_ref01_data = null;
        if (count($hous_ref01_data_raw) > 0) {
            $hous_ref01_data = Helpers::to_map($hous_ref01_data_raw[0][1]);
        }

        // LIST
        $hous_ref01_ent = $client->Hous(null);
        $hous_ref01_match = [];

        [$hous_ref01_list_result, $err] = $hous_ref01_ent->list($hous_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($hous_ref01_list_result);

    }
}

function hous_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/hous/HousTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameOfThronesQuotesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["hous01", "hous02", "hous03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GAMEOFTHRONESQUOTES_TEST_HOUS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAMEOFTHRONESQUOTES_TEST_HOUS_ENTID" => $idmap,
        "GAMEOFTHRONESQUOTES_TEST_LIVE" => "FALSE",
        "GAMEOFTHRONESQUOTES_TEST_EXPLAIN" => "FALSE",
        "GAMEOFTHRONESQUOTES_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAMEOFTHRONESQUOTES_TEST_HOUS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GAMEOFTHRONESQUOTES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GAMEOFTHRONESQUOTES_APIKEY"],
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
