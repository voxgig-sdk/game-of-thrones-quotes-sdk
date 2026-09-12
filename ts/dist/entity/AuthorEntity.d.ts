import { GameOfThronesQuotesEntityBase } from '../GameOfThronesQuotesEntityBase';
import type { GameOfThronesQuotesSDK } from '../GameOfThronesQuotesSDK';
import type { Control } from '../types';
import type { Author, AuthorListMatch } from '../GameOfThronesQuotesTypes';
declare class AuthorEntity extends GameOfThronesQuotesEntityBase<Author> {
    constructor(client: GameOfThronesQuotesSDK, entopts: any);
    make(this: AuthorEntity): AuthorEntity;
    list(this: any, reqmatch?: AuthorListMatch, ctrl?: Control): Promise<AuthorEntity[]>;
}
export { AuthorEntity };
