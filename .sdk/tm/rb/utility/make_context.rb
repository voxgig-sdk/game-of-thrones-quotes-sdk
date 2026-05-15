# GameOfThronesQuotes SDK utility: make_context
require_relative '../core/context'
module GameOfThronesQuotesUtilities
  MakeContext = ->(ctxmap, basectx) {
    GameOfThronesQuotesContext.new(ctxmap, basectx)
  }
end
