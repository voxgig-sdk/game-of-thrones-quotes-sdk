
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GameOfThronesQuotesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GameOfThronesQuotesSDK.test()
    equal(null !== testsdk, true)
  })

})
