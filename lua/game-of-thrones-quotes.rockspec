package = "voxgig-sdk-game-of-thrones-quotes"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/game-of-thrones-quotes-sdk.git"
}
description = {
  summary = "GameOfThronesQuotes SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["game-of-thrones-quotes_sdk"] = "game-of-thrones-quotes_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
