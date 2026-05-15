# GameOfThronesQuotes SDK utility: feature_add
module GameOfThronesQuotesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
