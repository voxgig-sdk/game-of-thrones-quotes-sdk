package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAuthorEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntity

var NewCharacterEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntity

var NewHousEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntity

var NewHousesEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntity

var NewRandomEntityFunc func(client *GameOfThronesQuotesSDK, entopts map[string]any) GameOfThronesQuotesEntity

