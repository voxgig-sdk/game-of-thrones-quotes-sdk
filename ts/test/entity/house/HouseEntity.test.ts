
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { GameOfThronesQuotesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('HouseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAMEOFTHRONESQUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAMEOFTHRONESQUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameOfThronesQuotesSDK.test()
    const ent = testsdk.House()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_OF_THRONES_QUOTES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'house.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let house_ref01_data = Object.values(setup.data.existing.house)[0] as any

    // LIST
    const house_ref01_ent = client.House()
    const house_ref01_match: any = {}

    const house_ref01_list = await house_ref01_ent.list(house_ref01_match)



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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID': idmap,
    'GAME_OF_THRONES_QUOTES_TEST_LIVE': 'FALSE',
    'GAME_OF_THRONES_QUOTES_TEST_EXPLAIN': 'FALSE',
    'GAME_OF_THRONES_QUOTES_APIKEY': 'NONE',
  })

  idmap = env['GAME_OF_THRONES_QUOTES_TEST_HOUSE_ENTID']

  const live = 'TRUE' === env.GAME_OF_THRONES_QUOTES_TEST_LIVE

  if (live) {
    client = new GameOfThronesQuotesSDK(merge([
      {
        apikey: env.GAME_OF_THRONES_QUOTES_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
