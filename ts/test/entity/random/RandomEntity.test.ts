

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


describe('RandomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_OF_THRONES_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_OF_THRONES_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameOfThronesQuotesSDK.test()
    const ent = testsdk.Random()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_OF_THRONES_QUOTES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'random.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"character":{"a":true,"h":"Character","n":"character","r":false,"t":"`$OBJECT`","key$":"character","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Full name of the character","t":"`$STRING`","key$":"name","index$":2},"sentence":{"a":true,"h":"Sentence","n":"sentence","r":false,"sh":"The quote text","t":"`$STRING`","key$":"sentence","index$":3},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"URL-friendly identifier for the character","t":"`$STRING`","key$":"slug","index$":4}},"id":{"field":"id","name":"id"},"name":"random","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /random/{count}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":5,"k":"param","n":"id","or":"count","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/random/{count}","q":{"exist":["id"]},"r":{"param":{"count":"id"}},"s":[{"lit":"random"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /random","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/random","q":{},"r":{},"s":[{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body.character`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"random","name__orig":"random","Name":"Random","name_":"random","name-":"random","NAME":"RANDOM","index$":3}, {"active":true,"entity":"random","key$":"BasicRandomFlow","kind":"basic","name":"BasicRandomFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"random_ref01","srcdatavar":"random_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-random_ref01"}}],"index$":0}]}, 'Random', {"GET /random/{count}":{"protocol":"http","operationId":"getRandomQuotes","responses":{"200":{"description":"Multiple random quotes","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"sentence":{"description":"The quote text","key$":"sentence","type":"string"},"character":{"key$":"character","properties":{"name":{"description":"Full name of the character","type":"string","key$":"name"},"slug":{"description":"URL-friendly identifier for the character","type":"string","key$":"slug"}},"type":"object","x-ref":"#/components/schemas/CharacterReference","index$":0}},"x-ref":"#/components/schemas/Quote","key$":"items"}}}}}},"parameters":[{"name":"count","in":"path","required":true,"description":"Number of random quotes to retrieve","schema":{"type":"integer","minimum":1,"example":5},"index$":0}],"securitySource":"unspecified"},"GET /random":{"protocol":"http","operationId":"getRandomQuote","responses":{"200":{"description":"A random quote","content":{"application/json":{"schema":{"type":"object","properties":{"sentence":{"description":"The quote text","key$":"sentence","type":"string"},"character":{"key$":"character","properties":{"name":{"description":"Full name of the character","type":"string","key$":"name"},"slug":{"description":"URL-friendly identifier for the character","type":"string","key$":"slug"}},"type":"object","x-ref":"#/components/schemas/CharacterReference","index$":0}},"x-ref":"#/components/schemas/Quote"},"example":{"sentence":"If I fall, don't bring me back.","character":{"name":"Jon Snow","slug":"jon"}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let random_ref01_data = Object.values(setup.data.existing.random)[0] as any

    // LOAD
    const random_ref01_ent = client.Random()
    const random_ref01_match_dt0: any = {}
    random_ref01_match_dt0.id = random_ref01_data.id
    const random_ref01_data_dt0 = (await random_ref01_ent.load(random_ref01_match_dt0)).data()
    assert(random_ref01_data_dt0.id === random_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/random/RandomTestData.json')

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
    ['random01','random02','random03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID': idmap,
    'GAME_OF_THRONES_QUOTES_TEST_LIVE': 'FALSE',
    'GAME_OF_THRONES_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID']

  const live = 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_OF_THRONES_QUOTES_TEST_RANDOM_ENTID']
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
  
