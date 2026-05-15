# GameOfThronesQuotes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GameOfThronesQuotesFeatures
  def self.make_feature(name)
    case name
    when "base"
      GameOfThronesQuotesBaseFeature.new
    when "test"
      GameOfThronesQuotesTestFeature.new
    else
      GameOfThronesQuotesBaseFeature.new
    end
  end
end
