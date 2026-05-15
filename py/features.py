# GameOfThronesQuotes SDK feature factory

from feature.base_feature import GameOfThronesQuotesBaseFeature
from feature.test_feature import GameOfThronesQuotesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GameOfThronesQuotesBaseFeature(),
        "test": lambda: GameOfThronesQuotesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
