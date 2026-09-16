

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GameOfThronesQuotesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('HouseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_OF_THRONES_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_OF_THRONES_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameOfThronesQuotesSDK.test()
    const ent = testsdk.House()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_OF_THRONES_QUOTES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'house.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"members","req":false,"short":"Members belonging to this house","type":"`$ARRAY`","index$":1},{"active":true,"name":"name","req":false,"short":"Full name of the house","type":"`$STRING`","index$":2},{"active":true,"name":"slug","req":false,"short":"URL-friendly identifier for the house","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"house","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /houses","json":"{\"operationId\":\"getHouses\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"members\":{\"description\":\"Members belonging to this house\",\"items\":{\"properties\":{\"name\":{\"description\":\"Full name of the character\",\"type\":\"string\"},\"slug\":{\"description\":\"URL-friendly identifier for the character\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"Full name of the house\",\"type\":\"string\"},\"slug\":{\"description\":\"URL-friendly identifier for the house\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of houses with members\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/houses","segments":[{"lit":"houses"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"lannister","kind":"param","name":"id","orig":"house","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /house/{house}","json":"{\"operationId\":\"getHouseDetails\",\"parameters\":[{\"description\":\"Slug or name of the house\",\"in\":\"path\",\"name\":\"house\",\"required\":true,\"schema\":{\"example\":\"lannister\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"members\":[{\"name\":\"Tyrion Lannister\",\"slug\":\"tyrion\"},{\"name\":\"Cersei Lannister\",\"slug\":\"cersei\"}],\"name\":\"House Lannister of Casterly Rock\",\"slug\":\"lannister\"},\"schema\":{\"properties\":{\"members\":{\"description\":\"Members belonging to this house\",\"items\":{\"properties\":{\"name\":{\"description\":\"Full name of the character\",\"type\":\"string\"},\"slug\":{\"description\":\"URL-friendly identifier for the character\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"Full name of the house\",\"type\":\"string\"},\"slug\":{\"description\":\"URL-friendly identifier for the house\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Details of the specified house\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/house/{house}","rename":{"param":{"house":"id"}},"segments":[{"lit":"house"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"house","name__orig":"house","Name":"House","name_":"house","name-":"house","NAME":"HOUSE","index$":2}, {"active":true,"entity":"house","key$":"BasicHouseFlow","kind":"basic","name":"BasicHouseFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"house_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"house_ref01","srcdatavar":"house_ref01_data","suffix":"_dt0"},"match":{"id":"house01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-house_ref01"}}],"index$":1}]}, 'House')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let house_ref01_data = Object.values(setup.data.existing.house)[0] as any

    // LIST
    const house_ref01_ent = client.House()
    const house_ref01_match: any = {}

    const house_ref01_list = (await house_ref01_ent.list(house_ref01_match)).map((e: any) => e.data())


    // LOAD
    const house_ref01_match_dt0: any = {}
    house_ref01_match_dt0.id = house_ref01_data.id
    const house_ref01_data_dt0 = (await house_ref01_ent.load(house_ref01_match_dt0)).data()
    assert(house_ref01_data_dt0.id === house_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/house/HouseTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GameOfThronesQuotesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['house01','house02','house03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID': idmap,
    'GAME_OF_THRONES_QUOTES_TEST_LIVE': 'FALSE',
    'GAME_OF_THRONES_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID']

  const live = 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GameOfThronesQuotesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
