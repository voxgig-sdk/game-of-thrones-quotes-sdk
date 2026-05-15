
import { Context } from './Context'


class GameOfThronesQuotesError extends Error {

  isGameOfThronesQuotesError = true

  sdk = 'GameOfThronesQuotes'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GameOfThronesQuotesError
}

