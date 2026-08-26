-- GameOfThronesQuotes SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "GameOfThronesQuotes",
      slug = "game-of-thrones-quotes",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.gameofthronesquotes.xyz/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["author"] = {},
        ["character"] = {},
        ["house"] = {},
        ["random"] = {},
      },
    },
    entity = {
      ["author"] = {
        ["fields"] = {
          {
            ["name"] = "character",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sentence",
            ["short"] = "The quote text",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "author",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "tyrion",
                      ["kind"] = "param",
                      ["name"] = "character",
                      ["orig"] = "character",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 2,
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/author/{character}/{count}",
                ["parts"] = {
                  "author",
                  "{character}",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "character",
                    "count",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "author",
            },
          },
        },
      },
      ["character"] = {
        ["fields"] = {
          {
            ["name"] = "house",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Full name of the character",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "quotes",
            ["short"] = "Quotes by this character",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "slug",
            ["short"] = "URL-friendly identifier for the character",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "character",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/characters",
                ["parts"] = {
                  "characters",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "jon",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "character",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/character/{character}",
                ["parts"] = {
                  "character",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["character"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["house"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "members",
            ["short"] = "Members belonging to this house",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["short"] = "Full name of the house",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["short"] = "URL-friendly identifier for the house",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "house",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/houses",
                ["parts"] = {
                  "houses",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "lannister",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "house",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/house/{house}",
                ["parts"] = {
                  "house",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["house"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["random"] = {
        ["fields"] = {
          {
            ["name"] = "character",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Full name of the character",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "sentence",
            ["short"] = "The quote text",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["short"] = "URL-friendly identifier for the character",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "random",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 5,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random/{count}",
                ["parts"] = {
                  "random",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["count"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random",
                ["parts"] = {
                  "random",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.character`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
