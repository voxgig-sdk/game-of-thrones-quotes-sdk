"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOfThronesQuotesError = void 0;
class GameOfThronesQuotesError extends Error {
    isGameOfThronesQuotesError = true;
    sdk = 'GameOfThronesQuotes';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GameOfThronesQuotesError = GameOfThronesQuotesError;
//# sourceMappingURL=GameOfThronesQuotesError.js.map