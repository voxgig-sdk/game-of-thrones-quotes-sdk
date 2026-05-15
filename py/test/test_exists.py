# ProjectName SDK exists test

import pytest
from gameofthronesquotes_sdk import GameOfThronesQuotesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GameOfThronesQuotesSDK.test(None, None)
        assert testsdk is not None
