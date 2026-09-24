

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"members":{"a":true,"h":"Members","n":"members","r":false,"sh":"Members belonging to this house","t":"`$ARRAY`","key$":"members","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Full name of the house","t":"`$STRING`","key$":"name","index$":2},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"URL-friendly identifier for the house","t":"`$STRING`","key$":"slug","index$":3}},"id":{"field":"id","name":"id"},"name":"house","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /houses","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/houses","q":{},"r":{},"s":[{"lit":"houses"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /house/{house}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"lannister","k":"param","n":"id","or":"house","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/house/{house}","q":{"exist":["id"]},"r":{"param":{"house":"id"}},"s":[{"lit":"house"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"house","name__orig":"house","Name":"House","name_":"house","name-":"house","NAME":"HOUSE","index$":2}, {"active":true,"entity":"house","key$":"BasicHouseFlow","kind":"basic","name":"BasicHouseFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"house_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"house_ref01","srcdatavar":"house_ref01_data","suffix":"_dt0"},"m":{"id":"house01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-house_ref01"}}],"index$":1}]}, 'House', {"GET /houses":{"protocol":"http","operationId":"getHouses","responses":{"200":{"description":"List of houses with members","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"slug":{"type":"string","description":"URL-friendly identifier for the house","key$":"slug"},"name":{"type":"string","description":"Full name of the house","key$":"name"},"members":{"type":"array","description":"Members belonging to this house","items":{"type":"object","properties":{"name":{"description":"Full name of the character","type":"string"},"slug":{"description":"URL-friendly identifier for the character","type":"string"}},"x-ref":"#/components/schemas/CharacterReference"},"key$":"members"}},"x-ref":"#/components/schemas/House","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /house/{house}":{"protocol":"http","operationId":"getHouseDetails","responses":{"200":{"description":"Details of the specified house","content":{"application/json":{"schema":{"type":"object","properties":{"slug":{"type":"string","description":"URL-friendly identifier for the house","key$":"slug"},"name":{"type":"string","description":"Full name of the house","key$":"name"},"members":{"type":"array","description":"Members belonging to this house","items":{"type":"object","properties":{"name":{"description":"Full name of the character","type":"string"},"slug":{"description":"URL-friendly identifier for the character","type":"string"}},"x-ref":"#/components/schemas/CharacterReference"},"key$":"members"}},"x-ref":"#/components/schemas/House","index$":0},"example":{"slug":"lannister","name":"House Lannister of Casterly Rock","members":[{"name":"Tyrion Lannister","slug":"tyrion"},{"name":"Cersei Lannister","slug":"cersei"}]}}}}},"parameters":[{"name":"house","in":"path","required":true,"description":"Slug or name of the house","schema":{"type":"string","example":"lannister"},"index$":0}],"securitySource":"unspecified"}})
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
  
