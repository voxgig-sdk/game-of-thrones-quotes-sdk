import { GameOfThronesQuotesEntityBase } from '../GameOfThronesQuotesEntityBase';
import type { GameOfThronesQuotesSDK } from '../GameOfThronesQuotesSDK';
import type { Control } from '../types';
import type { Character, CharacterLoadMatch, CharacterListMatch } from '../GameOfThronesQuotesTypes';
declare class CharacterEntity extends GameOfThronesQuotesEntityBase<Character> {
    constructor(client: GameOfThronesQuotesSDK, entopts: any);
    make(this: CharacterEntity): CharacterEntity;
    load(this: any, reqmatch?: CharacterLoadMatch, ctrl?: Control): Promise<CharacterEntity>;
    list(this: any, reqmatch?: CharacterListMatch, ctrl?: Control): Promise<CharacterEntity[]>;
}
export { CharacterEntity };
