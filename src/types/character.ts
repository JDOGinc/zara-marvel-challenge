export interface Character {
    id: number;
    name: string;
    imageUrl: string;
    isFavorite: boolean;
    description: string;
}

export interface Comic {
    id: number;
    title: string;
    imageUrl: string;
    year: string;
}