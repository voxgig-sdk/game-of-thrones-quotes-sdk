<?php
declare(strict_types=1);

// GameOfThronesQuotes SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GameOfThronesQuotesUtility::setRegistrar(function (GameOfThronesQuotesUtility $u): void {
    $u->clean = [GameOfThronesQuotesClean::class, 'call'];
    $u->done = [GameOfThronesQuotesDone::class, 'call'];
    $u->make_error = [GameOfThronesQuotesMakeError::class, 'call'];
    $u->feature_add = [GameOfThronesQuotesFeatureAdd::class, 'call'];
    $u->feature_hook = [GameOfThronesQuotesFeatureHook::class, 'call'];
    $u->feature_init = [GameOfThronesQuotesFeatureInit::class, 'call'];
    $u->fetcher = [GameOfThronesQuotesFetcher::class, 'call'];
    $u->make_fetch_def = [GameOfThronesQuotesMakeFetchDef::class, 'call'];
    $u->make_context = [GameOfThronesQuotesMakeContext::class, 'call'];
    $u->make_options = [GameOfThronesQuotesMakeOptions::class, 'call'];
    $u->make_request = [GameOfThronesQuotesMakeRequest::class, 'call'];
    $u->make_response = [GameOfThronesQuotesMakeResponse::class, 'call'];
    $u->make_result = [GameOfThronesQuotesMakeResult::class, 'call'];
    $u->make_point = [GameOfThronesQuotesMakePoint::class, 'call'];
    $u->make_spec = [GameOfThronesQuotesMakeSpec::class, 'call'];
    $u->make_url = [GameOfThronesQuotesMakeUrl::class, 'call'];
    $u->param = [GameOfThronesQuotesParam::class, 'call'];
    $u->prepare_auth = [GameOfThronesQuotesPrepareAuth::class, 'call'];
    $u->prepare_body = [GameOfThronesQuotesPrepareBody::class, 'call'];
    $u->prepare_headers = [GameOfThronesQuotesPrepareHeaders::class, 'call'];
    $u->prepare_method = [GameOfThronesQuotesPrepareMethod::class, 'call'];
    $u->prepare_params = [GameOfThronesQuotesPrepareParams::class, 'call'];
    $u->prepare_path = [GameOfThronesQuotesPreparePath::class, 'call'];
    $u->prepare_query = [GameOfThronesQuotesPrepareQuery::class, 'call'];
    $u->result_basic = [GameOfThronesQuotesResultBasic::class, 'call'];
    $u->result_body = [GameOfThronesQuotesResultBody::class, 'call'];
    $u->result_headers = [GameOfThronesQuotesResultHeaders::class, 'call'];
    $u->transform_request = [GameOfThronesQuotesTransformRequest::class, 'call'];
    $u->transform_response = [GameOfThronesQuotesTransformResponse::class, 'call'];
});
