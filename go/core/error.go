package core

type GameOfThronesQuotesError struct {
	IsGameOfThronesQuotesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGameOfThronesQuotesError(code string, msg string, ctx *Context) *GameOfThronesQuotesError {
	return &GameOfThronesQuotesError{
		IsGameOfThronesQuotesError: true,
		Sdk:              "GameOfThronesQuotes",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GameOfThronesQuotesError) Error() string {
	return e.Msg
}
