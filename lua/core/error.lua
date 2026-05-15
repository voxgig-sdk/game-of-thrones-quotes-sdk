-- GameOfThronesQuotes SDK error

local GameOfThronesQuotesError = {}
GameOfThronesQuotesError.__index = GameOfThronesQuotesError


function GameOfThronesQuotesError.new(code, msg, ctx)
  local self = setmetatable({}, GameOfThronesQuotesError)
  self.is_sdk_error = true
  self.sdk = "GameOfThronesQuotes"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GameOfThronesQuotesError:error()
  return self.msg
end


function GameOfThronesQuotesError:__tostring()
  return self.msg
end


return GameOfThronesQuotesError
