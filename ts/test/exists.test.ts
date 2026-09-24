
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GameOfThronesQuotesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GameOfThronesQuotesSDK.test()
    equal(testsdk instanceof GameOfThronesQuotesSDK, true,
      'GameOfThronesQuotesSDK.test() must return a client synchronously')
  })

})
