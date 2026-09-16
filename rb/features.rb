# GameOfThronesQuotes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GameOfThronesQuotesFeatures
  def self.make_feature(name)
    case name
    when "base"
      GameOfThronesQuotesBaseFeature.new
    when "ratelimit"
      GameOfThronesQuotesRatelimitFeature.new
    when "retry"
      GameOfThronesQuotesRetryFeature.new
    when "test"
      GameOfThronesQuotesTestFeature.new
    when "timeout"
      GameOfThronesQuotesTimeoutFeature.new
    else
      GameOfThronesQuotesBaseFeature.new
    end
  end
end
