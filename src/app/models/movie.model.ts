export interface MovieResponse {
    dates?: any;
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: number[];
    id: number;
    imdb_id?: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    belongs_to_collection?: Partial<Movie>;
    budget?: number;
    genres: Genre[];
    homepage?: string;
    production_companies?: any[];
    production_countries?: any[];
    revenue?: number;
    runtime?: number;
    spoken_languages: any[];
    status: string;
    tagline: string;
}

export interface Genre {
    id: number;
    name: string;
}