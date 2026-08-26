package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go"
	"github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go/core"

	vs "github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go/utility/struct"
)

func TestRandomEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Random(nil)
		if ent == nil {
			t.Fatal("expected non-nil RandomEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := randomBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "random." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		randomRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.random", setup.data)))
		var randomRef01Data map[string]any
		if len(randomRef01DataRaw) > 0 {
			randomRef01Data = core.ToMapAny(randomRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = randomRef01Data

		// LOAD
		randomRef01Ent := client.Random(nil)
		randomRef01MatchDt0 := map[string]any{
			"id": randomRef01Data["id"],
		}
		randomRef01DataDt0Loaded, err := randomRef01Ent.Load(randomRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		randomRef01DataDt0LoadResult := core.ToMapAny(entityData(randomRef01DataDt0Loaded))
		if randomRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if randomRef01DataDt0LoadResult["id"] != randomRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func randomBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "random", "RandomTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read random test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse random test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"random01", "random02", "random03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID": idmap,
		"GAME_OF_THRONES_QUOTES_TEST_LIVE":      "FALSE",
		"GAME_OF_THRONES_QUOTES_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewGameOfThronesQuotesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GAME_OF_THRONES_QUOTES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
