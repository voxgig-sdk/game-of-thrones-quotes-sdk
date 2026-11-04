package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAuthorEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntityBase

var NewCharacterEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntityBase

var NewHouseEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntityBase

var NewRandomEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntityBase

