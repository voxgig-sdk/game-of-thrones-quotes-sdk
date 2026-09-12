"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'GameOfThronesQuotes',
        slug: "game-of-thrones-quotes",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api.gameofthronesquotes.xyz/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            author: {},
            character: {},
            house: {},
            random: {},
        }
    };
    entity = {
        "author": {
            "fields": [
                {
                    "name": "character",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "sentence",
                    "short": "The quote text",
                    "type": "`$STRING`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 2,
                                        "kind": "param",
                                        "name": "count",
                                        "orig": "count",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/author/{character}/{count}",
                            "segments": [
                                {
                                    "lit": "author"
                                },
                                {
                                    "var": "character"
                                },
                                {
                                    "var": "count"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "character",
                                    "count"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "author",
                                "{character}",
                                "{count}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "author"
                    ]
                ]
            }
        },
        "character": {
            "fields": [
                {
                    "name": "house",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Full name of the character",
                    "type": "`$STRING`"
                },
                {
                    "name": "quotes",
                    "short": "Quotes by this character",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "slug",
                    "short": "URL-friendly identifier for the character",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "characters"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "characters"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/character/{character}",
                            "rename": {
                                "param": {
                                    "character": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "character"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "character",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "house": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "members",
                    "short": "Members belonging to this house",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "name",
                    "short": "Full name of the house",
                    "type": "`$STRING`"
                },
                {
                    "name": "slug",
                    "short": "URL-friendly identifier for the house",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "houses"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "houses"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/house/{house}",
                            "rename": {
                                "param": {
                                    "house": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "house"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "house",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "random": {
            "fields": [
                {
                    "name": "character",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Full name of the character",
                    "type": "`$STRING`"
                },
                {
                    "name": "sentence",
                    "short": "The quote text",
                    "type": "`$STRING`"
                },
                {
                    "name": "slug",
                    "short": "URL-friendly identifier for the character",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/random/{count}",
                            "rename": {
                                "param": {
                                    "count": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "random"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "random",
                                "{id}"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/random",
                            "segments": [
                                {
                                    "lit": "random"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.character`"
                            },
                            "parts": [
                                "random"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map