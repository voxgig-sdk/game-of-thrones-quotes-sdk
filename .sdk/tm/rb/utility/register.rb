# GameOfThronesQuotes SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GameOfThronesQuotesUtility.registrar = ->(u) {
  u.clean = GameOfThronesQuotesUtilities::Clean
  u.done = GameOfThronesQuotesUtilities::Done
  u.make_error = GameOfThronesQuotesUtilities::MakeError
  u.feature_add = GameOfThronesQuotesUtilities::FeatureAdd
  u.feature_hook = GameOfThronesQuotesUtilities::FeatureHook
  u.feature_init = GameOfThronesQuotesUtilities::FeatureInit
  u.fetcher = GameOfThronesQuotesUtilities::Fetcher
  u.make_fetch_def = GameOfThronesQuotesUtilities::MakeFetchDef
  u.make_context = GameOfThronesQuotesUtilities::MakeContext
  u.make_options = GameOfThronesQuotesUtilities::MakeOptions
  u.make_request = GameOfThronesQuotesUtilities::MakeRequest
  u.make_response = GameOfThronesQuotesUtilities::MakeResponse
  u.make_result = GameOfThronesQuotesUtilities::MakeResult
  u.make_point = GameOfThronesQuotesUtilities::MakePoint
  u.make_spec = GameOfThronesQuotesUtilities::MakeSpec
  u.make_url = GameOfThronesQuotesUtilities::MakeUrl
  u.param = GameOfThronesQuotesUtilities::Param
  u.prepare_auth = GameOfThronesQuotesUtilities::PrepareAuth
  u.prepare_body = GameOfThronesQuotesUtilities::PrepareBody
  u.prepare_headers = GameOfThronesQuotesUtilities::PrepareHeaders
  u.prepare_method = GameOfThronesQuotesUtilities::PrepareMethod
  u.prepare_params = GameOfThronesQuotesUtilities::PrepareParams
  u.prepare_path = GameOfThronesQuotesUtilities::PreparePath
  u.prepare_query = GameOfThronesQuotesUtilities::PrepareQuery
  u.graphql_body = GameOfThronesQuotesUtilities::GraphqlBody
  u.graphql_errors = GameOfThronesQuotesUtilities::GraphqlErrors
  u.result_basic = GameOfThronesQuotesUtilities::ResultBasic
  u.result_body = GameOfThronesQuotesUtilities::ResultBody
  u.result_headers = GameOfThronesQuotesUtilities::ResultHeaders
  u.transform_request = GameOfThronesQuotesUtilities::TransformRequest
  u.transform_response = GameOfThronesQuotesUtilities::TransformResponse
}
