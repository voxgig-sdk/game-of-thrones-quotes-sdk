

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


describe('AuthorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_OF_THRONES_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_OF_THRONES_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameOfThronesQuotesSDK.test()
    const ent = testsdk.Author()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_OF_THRONES_QUOTES_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'author.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"character":{"a":true,"h":"Character","n":"character","r":false,"t":"`$OBJECT`","key$":"character","index$":0},"sentence":{"a":true,"h":"Sentence","n":"sentence","r":false,"sh":"The quote text","t":"`$STRING`","key$":"sentence","index$":1}},"name":"author","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /author/{character}/{count}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"tyrion","k":"param","n":"character","or":"character","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":2,"k":"param","n":"count","or":"count","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/author/{character}/{count}","q":{"exist":["character","count"]},"r":{},"s":[{"lit":"author"},{"var":"character"},{"var":"count"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"author","name__orig":"author","Name":"Author","name_":"author","name-":"author","NAME":"AUTHOR","index$":0}, {"active":true,"entity":"author","key$":"BasicAuthorFlow","kind":"basic","name":"BasicAuthorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"character":"character01","count":"count01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"author_ref01"}}],"index$":0}]}, 'Author', {"GET /author/{character}/{count}":{"protocol":"http","parameters":[{"name":"character","in":"path","required":true,"description":"Slug or name of the character","schema":{"type":"string","example":"tyrion"},"index$":0},{"name":"count","in":"path","required":true,"description":"Number of quotes to retrieve","schema":{"type":"integer","minimum":1,"example":2},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let author_ref01_data = Object.values(setup.data.existing.author)[0] as any

    // LIST
    const author_ref01_ent = client.Author()
    const author_ref01_match: any = {}
    author_ref01_match['character'] = setup.idmap['character01']
    author_ref01_match['count'] = setup.idmap['count01']

    const author_ref01_list = (await author_ref01_ent.list(author_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/author/AuthorTestData.json')

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
    ['author01','author02','author03','character01','count01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID': idmap,
    'GAME_OF_THRONES_QUOTES_TEST_LIVE': 'FALSE',
    'GAME_OF_THRONES_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID']

  const live = 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_OF_THRONES_QUOTES_TEST_AUTHOR_ENTID']
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
  
