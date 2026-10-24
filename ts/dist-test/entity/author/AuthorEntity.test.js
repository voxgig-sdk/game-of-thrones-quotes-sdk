"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AuthorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_OF_THRONES_QUOTES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_OF_THRONES_QUOTES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameOfThronesQuotesSDK.test();
        const ent = testsdk.Author();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GameOfThronesQuotesSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Author().list({ "character": 1, "count": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_OF_THRONES_QUOTES_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'author.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "character": { "a": true, "h": "Character", "n": "character", "r": false, "t": "`$OBJECT`", "key$": "character", "index$": 0 }, "sentence": { "a": true, "h": "Sentence", "n": "sentence", "r": false, "sh": "The quote text", "t": "`$STRING`", "key$": "sentence", "index$": 1 } }, "name": "author", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /author/{character}/{count}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "tyrion", "k": "param", "n": "character", "or": "character", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 2, "k": "param", "n": "count", "or": "count", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/author/{character}/{count}", "q": { "exist": ["character", "count"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "author" }, { "var": "character" }, { "var": "count" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "author", "name__orig": "author", "Name": "Author", "name_": "author", "name-": "author", "NAME": "AUTHOR", "index$": 0 }, { "active": true, "entity": "author", "key$": "BasicAuthorFlow", "kind": "basic", "name": "BasicAuthorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "character": "character01", "count": "count01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "author_ref01" } }], "index$": 0 }] }, 'Author', { "GET /author/{character}/{count}": { "protocol": "http", "parameters": [{ "name": "character", "in": "path", "required": true, "description": "Slug or name of the character", "schema": { "type": "string", "example": "tyrion" }, "index$": 0 }, { "name": "count", "in": "path", "required": true, "description": "Number of quotes to retrieve", "schema": { "type": "integer", "minimum": 1, "example": 2 }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let author_ref01_data = Object.values(setup.data.existing.author)[0];
        // LIST
        const author_ref01_ent = client.Author();
        const author_ref01_match = {};
        author_ref01_match['character'] = setup.idmap['character01'];
        author_ref01_match['count'] = setup.idmap['count01'];
        const author_ref01_list = (await author_ref01_ent.list(author_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/author/AuthorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameOfThronesQuotesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['author01', 'author02', 'author03', 'character01', 'count01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID': idmap,
        'GAME_OF_THRONES_QUOTES_TEST_LIVE': 'FALSE',
        'GAME_OF_THRONES_QUOTES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID'];
    const live = 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GameOfThronesQuotesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AuthorEntity.test.js.map