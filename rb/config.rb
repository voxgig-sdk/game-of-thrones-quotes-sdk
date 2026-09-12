# GameOfThronesQuotes SDK configuration

module GameOfThronesQuotesConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "GameOfThronesQuotes",
        "slug" => "game-of-thrones-quotes",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "character",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sentence",
              "short" => "The quote text",
              "type" => "`$STRING`",
            },
          ],
          "name" => "author",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "tyrion",
                        "kind" => "param",
                        "name" => "character",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 2,
                        "kind" => "param",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/author/{character}/{count}",
                  "segments" => [
                    {
                      "lit" => "author",
                    },
                    {
                      "var" => "character",
                    },
                    {
                      "var" => "count",
                    },
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
                  "parts" => [
                    "author",
                    "{character}",
                    "{count}",
                  ],
                },
              ],
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
              "name" => "house",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Full name of the character",
              "type" => "`$STRING`",
            },
            {
              "name" => "quotes",
              "short" => "Quotes by this character",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "slug",
              "short" => "URL-friendly identifier for the character",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "character",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/characters",
                  "segments" => [
                    {
                      "lit" => "characters",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "characters",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "jon",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/character/{character}",
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "character",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "character",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "house" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "members",
              "short" => "Members belonging to this house",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "short" => "Full name of the house",
              "type" => "`$STRING`",
            },
            {
              "name" => "slug",
              "short" => "URL-friendly identifier for the house",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "house",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/houses",
                  "segments" => [
                    {
                      "lit" => "houses",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "houses",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "lannister",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "house",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/house/{house}",
                  "rename" => {
                    "param" => {
                      "house" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "house",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "house",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "random" => {
          "fields" => [
            {
              "name" => "character",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Full name of the character",
              "type" => "`$STRING`",
            },
            {
              "name" => "sentence",
              "short" => "The quote text",
              "type" => "`$STRING`",
            },
            {
              "name" => "slug",
              "short" => "URL-friendly identifier for the character",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "random",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 5,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/random/{count}",
                  "rename" => {
                    "param" => {
                      "count" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "random",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "random",
                    "{id}",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/random",
                  "segments" => [
                    {
                      "lit" => "random",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.character`",
                  },
                  "parts" => [
                    "random",
                  ],
                },
              ],
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
