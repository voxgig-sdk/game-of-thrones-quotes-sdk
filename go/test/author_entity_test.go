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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const authorEntityLiveStrict = true


func TestAuthorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Author(nil)
		if ent == nil {
			t.Fatal("expected non-nil AuthorEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Author(nil).List(map[string]any{"character": 1, "count": 1}, nil)
		if sdkerr, ok := err.(*core.GameOfThronesQuotesError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := authorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "author." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"character01", "count01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, authorEntityLiveStrict, "Live entity test blocked: needs %s via GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		authorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.author")))
		var authorRef01Data map[string]any
		if len(authorRef01DataRaw) > 0 {
			authorRef01Data = core.ToMapAny(authorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = authorRef01Data

		// LIST
		authorRef01Ent := client.Author(nil)
		authorRef01Match := map[string]any{
			"character": setup.idmap["character01"],
			"count": setup.idmap["count01"],
		}

		authorRef01ListResult, err := authorRef01Ent.List(authorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, authorRef01ListOk := authorRef01ListResult.([]any)
		if !authorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", authorRef01ListResult)
		}

	})
}

func authorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "author", "AuthorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read author test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse author test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"author01", "author02", "author03", "character01", "count01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID": idmap,
		"GAME_OF_THRONES_QUOTES_TEST_LIVE":      "FALSE",
		"GAME_OF_THRONES_QUOTES_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GAME_OF_THRONES_QUOTES_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
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
