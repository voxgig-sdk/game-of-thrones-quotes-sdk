

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


describe('CharacterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_OF_THRONES_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_OF_THRONES_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameOfThronesQuotesSDK.test()
    const ent = testsdk.Character()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_OF_THRONES_QUOTES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'character.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"house":{"a":true,"h":"House","n":"house","r":false,"t":"`$OBJECT`","key$":"house","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Full name of the character","t":"`$STRING`","key$":"name","index$":2},"quotes":{"a":true,"h":"Quotes","n":"quotes","r":false,"sh":"Quotes by this character","t":"`$ARRAY`","key$":"quotes","index$":3},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"URL-friendly identifier for the character","t":"`$STRING`","key$":"slug","index$":4}},"id":{"field":"id","name":"id"},"name":"character","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /characters","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/characters","q":{},"r":{},"s":[{"lit":"characters"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /character/{character}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"jon","k":"param","n":"id","or":"character","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/character/{character}","q":{"exist":["id"]},"r":{"param":{"character":"id"}},"s":[{"lit":"character"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"character","name__orig":"character","Name":"Character","name_":"character","name-":"character","NAME":"CHARACTER","index$":1}, {"active":true,"entity":"character","key$":"BasicCharacterFlow","kind":"basic","name":"BasicCharacterFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"character_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"character_ref01","srcdatavar":"character_ref01_data","suffix":"_dt0"},"m":{"id":"character01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-character_ref01"}}],"index$":1}]}, 'Character', {"GET /characters":{"protocol":"http","operationId":"getCharacters","responses":{"200":{"description":"List of characters with quotes","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"Full name of the character","key$":"name"},"slug":{"type":"string","description":"URL-friendly identifier for the character","key$":"slug"},"house":{"type":"object","properties":{"name":{"type":"string","description":"Full name of the house"},"slug":{"type":"string","description":"URL-friendly identifier for the house"}},"key$":"house"},"quotes":{"type":"array","description":"Quotes by this character","items":{"type":"string"},"key$":"quotes"}},"x-ref":"#/components/schemas/Character","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /character/{character}":{"protocol":"http","operationId":"getCharacterDetails","responses":{"200":{"description":"Details of the specified character with quotes","content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"Full name of the character","key$":"name"},"slug":{"type":"string","description":"URL-friendly identifier for the character","key$":"slug"},"house":{"type":"object","properties":{"name":{"type":"string","description":"Full name of the house"},"slug":{"type":"string","description":"URL-friendly identifier for the house"}},"key$":"house"},"quotes":{"type":"array","description":"Quotes by this character","items":{"type":"string"},"key$":"quotes"}},"x-ref":"#/components/schemas/Character","index$":0},"example":{"name":"Jon Snow","slug":"jon","house":{"name":"House Stark of Winterfell","slug":"stark"},"quotes":["If I fall, don't bring me back."]}}}}},"parameters":[{"name":"character","in":"path","required":true,"description":"Slug or name of the character","schema":{"type":"string","example":"jon"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let character_ref01_data = Object.values(setup.data.existing.character)[0] as any

    // LIST
    const character_ref01_ent = client.Character()
    const character_ref01_match: any = {}

    const character_ref01_list = (await character_ref01_ent.list(character_ref01_match)).map((e: any) => e.data())


    // LOAD
    const character_ref01_match_dt0: any = {}
    character_ref01_match_dt0.id = character_ref01_data.id
    const character_ref01_data_dt0 = (await character_ref01_ent.load(character_ref01_match_dt0)).data()
    assert(character_ref01_data_dt0.id === character_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/character/CharacterTestData.json')

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
    ['character01','character02','character03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_OF_THRONES_QUOTES_TEST_CHARACTER_ENTID': idmap,
    'GAME_OF_THRONES_QUOTES_TEST_LIVE': 'FALSE',
    'GAME_OF_THRONES_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GAME_OF_THRONES_QUOTES_TEST_CHARACTER_ENTID']

  const live = 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_OF_THRONES_QUOTES_TEST_CHARACTER_ENTID']
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
  
