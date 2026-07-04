# GameOfThronesQuotes SDK configuration

module GameOfThronesQuotesConfig
  def self.make_config
    {
      "main" => {
        "name" => "GameOfThronesQuotes",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.gameofthronesquotes.xyz/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "author" => {},
          "character" => {},
          "house" => {},
          "random" => {},
        },
      },
      "entity" => {
        "author" => {
          "fields" => [
            {
              "active" => true,
              "name" => "character",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "sentence",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "author",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "tyrion",
                        "kind" => "param",
                        "name" => "character",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "example" => 2,
                        "kind" => "param",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 1,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/author/{character}/{count}",
                  "parts" => [
                    "author",
                    "{character}",
                    "{count}",
                  ],
                  "select" => {
                    "exist" => [
                      "character",
                      "count",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "author",
              ],
            ],
          },
        },
        "character" => {
          "fields" => [
            {
              "active" => true,
              "name" => "house",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "quote",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "slug",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
          ],
          "name" => "character",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/characters",
                  "parts" => [
                    "characters",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "jon",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/character/{character}",
                  "parts" => [
                    "character",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "house" => {
          "fields" => [
            {
              "active" => true,
              "name" => "member",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "slug",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
          ],
          "name" => "house",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/houses",
                  "parts" => [
                    "houses",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "lannister",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "house",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/house/{house}",
                  "parts" => [
                    "house",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "house" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "random" => {
          "fields" => [
            {
              "active" => true,
              "name" => "character",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "sentence",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "random",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => 5,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/random/{count}",
                  "parts" => [
                    "random",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "count" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/random",
                  "parts" => [
                    "random",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GameOfThronesQuotesFeatures.make_feature(name)
  end
end
