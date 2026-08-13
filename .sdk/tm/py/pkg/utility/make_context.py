# GameOfThronesQuotes SDK utility: make_context

from projectname_sdk.core.context import GameOfThronesQuotesContext


def make_context_util(ctxmap, basectx):
    return GameOfThronesQuotesContext(ctxmap, basectx)
