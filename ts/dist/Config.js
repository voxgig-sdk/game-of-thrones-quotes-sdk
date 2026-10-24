"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                    "title": "Character",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "sentence",
                    "title": "Sentence",
                    "type": "`$STRING`",
                    "short": "The quote text"
                }
            ],
            "name": "author",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                "author",
                                "{character}",
                                "{count}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "character",
                                        "orig": "character",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "tyrion"
                                    },
                                    {
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 2
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "character",
                                    "count"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "character": {
            "fields": [
                {
                    "name": "house",
                    "title": "House",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Full name of the character"
                },
                {
                    "name": "quotes",
                    "title": "Quotes",
                    "type": "`$ARRAY`",
                    "short": "Quotes by this character"
                },
                {
                    "name": "slug",
                    "title": "Slug",
                    "type": "`$STRING`",
                    "short": "URL-friendly identifier for the character"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/characters",
                            "segments": [
                                {
                                    "lit": "characters"
                                }
                            ],
                            "parts": [
                                "characters"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/character/{character}",
                            "segments": [
                                {
                                    "lit": "character"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "character",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "character": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "character",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "jon"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "members",
                    "title": "Members",
                    "type": "`$ARRAY`",
                    "short": "Members belonging to this house"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Full name of the house"
                },
                {
                    "name": "slug",
                    "title": "Slug",
                    "type": "`$STRING`",
                    "short": "URL-friendly identifier for the house"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/houses",
                            "segments": [
                                {
                                    "lit": "houses"
                                }
                            ],
                            "parts": [
                                "houses"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/house/{house}",
                            "segments": [
                                {
                                    "lit": "house"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "house",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "house": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "house",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "lannister"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "title": "Character",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "sentence",
                    "title": "Sentence",
                    "type": "`$STRING`",
                    "short": "The quote text"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/random/{count}",
                            "segments": [
                                {
                                    "lit": "random"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "random",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "count": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "count",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 5
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/random",
                            "segments": [
                                {
                                    "lit": "random"
                                }
                            ],
                            "parts": [
                                "random"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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