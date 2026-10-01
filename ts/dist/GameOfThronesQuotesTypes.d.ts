export interface Author {
    character?: Record<string, any>;
    sentence?: string;
}
export interface AuthorListMatch {
    character: string;
    count: number;
}
export interface Character {
    house?: Record<string, any>;
    id?: string;
    name?: string;
    quotes?: any[];
    slug?: string;
}
export interface CharacterLoadMatch {
    id: string;
}
export interface CharacterListMatch {
    house?: Record<string, any>;
    id?: string;
    name?: string;
    quotes?: any[];
    slug?: string;
}
export interface House {
    id?: string;
    members?: any[];
    name?: string;
    slug?: string;
}
export interface HouseLoadMatch {
    id: string;
}
export interface HouseListMatch {
    id?: string;
    members?: any[];
    name?: string;
    slug?: string;
}
export interface Random {
    character?: Record<string, any>;
    id?: string;
    sentence?: string;
}
export interface RandomLoadMatch {
    id: number;
}
