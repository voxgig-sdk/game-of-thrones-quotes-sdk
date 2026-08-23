# GameOfThronesQuotes SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "GameOfThronesQuotes",
            "slug": "game-of-thrones-quotes",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.gameofthronesquotes.xyz/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "author": {},
                "character": {},
                "house": {},
                "random": {},
            },
        },
        "entity": {
      "author": {
        "fields": [
          {
            "name": "character",
            "type": "`$OBJECT`",
          },
          {
            "name": "sentence",
            "short": "The quote text",
            "type": "`$STRING`",
          },
        ],
        "name": "author",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "tyrion",
                      "kind": "param",
                      "name": "character",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 2,
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/author/{character}/{count}",
                "parts": [
                  "author",
                  "{character}",
                  "{count}",
                ],
                "select": {
                  "exist": [
                    "character",
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "author",
            ],
          ],
        },
      },
      "character": {
        "fields": [
          {
            "name": "house",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "short": "Full name of the character",
            "type": "`$STRING`",
          },
          {
            "name": "quotes",
            "short": "Quotes by this character",
            "type": "`$ARRAY`",
          },
          {
            "name": "slug",
            "short": "URL-friendly identifier for the character",
            "type": "`$STRING`",
          },
        ],
        "name": "character",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/characters",
                "parts": [
                  "characters",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "jon",
                      "kind": "param",
                      "name": "id",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/character/{character}",
                "parts": [
                  "character",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "character": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "house": {
        "fields": [
          {
            "name": "members",
            "short": "Members belonging to this house",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "short": "Full name of the house",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "short": "URL-friendly identifier for the house",
            "type": "`$STRING`",
          },
        ],
        "name": "house",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/houses",
                "parts": [
                  "houses",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "lannister",
                      "kind": "param",
                      "name": "id",
                      "orig": "house",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/house/{house}",
                "parts": [
                  "house",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "house": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "random": {
        "fields": [
          {
            "name": "character",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "short": "Full name of the character",
            "type": "`$STRING`",
          },
          {
            "name": "sentence",
            "short": "The quote text",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "short": "URL-friendly identifier for the character",
            "type": "`$STRING`",
          },
        ],
        "name": "random",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 5,
                      "kind": "param",
                      "name": "id",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/random/{count}",
                "parts": [
                  "random",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "count": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/random",
                "parts": [
                  "random",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.character`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
