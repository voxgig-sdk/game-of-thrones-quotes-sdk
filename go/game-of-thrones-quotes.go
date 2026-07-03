package voxgiggameofthronesquotessdk

import (
	"github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go/core"
	"github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go/entity"
	"github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go/feature"
	_ "github.com/voxgig-sdk/game-of-thrones-quotes-sdk/go/utility"
)

// Type aliases preserve external API.
type GameOfThronesQuotesSDK = core.GameOfThronesQuotesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GameOfThronesQuotesEntity = core.GameOfThronesQuotesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GameOfThronesQuotesError = core.GameOfThronesQuotesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAuthorEntityFunc = func(client *core.GameOfThronesQuotesSDK, entopts map[string]any) core.GameOfThronesQuotesEntity {
		return entity.NewAuthorEntity(client, entopts)
	}
	core.NewCharacterEntityFunc = func(client *core.GameOfThronesQuotesSDK, entopts map[string]any) core.GameOfThronesQuotesEntity {
		return entity.NewCharacterEntity(client, entopts)
	}
	core.NewHouseEntityFunc = func(client *core.GameOfThronesQuotesSDK, entopts map[string]any) core.GameOfThronesQuotesEntity {
		return entity.NewHouseEntity(client, entopts)
	}
	core.NewRandomEntityFunc = func(client *core.GameOfThronesQuotesSDK, entopts map[string]any) core.GameOfThronesQuotesEntity {
		return entity.NewRandomEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGameOfThronesQuotesSDK = core.NewGameOfThronesQuotesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGameOfThronesQuotesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GameOfThronesQuotesSDK  { return NewGameOfThronesQuotesSDK(nil) }
func Test() *GameOfThronesQuotesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
