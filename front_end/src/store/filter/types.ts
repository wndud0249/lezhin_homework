export interface FilterTypes {
  contentStateFilter: string;
  freedEpisodeFilter: boolean;
}

export interface ComicTypes {
  id: number;
  alias: string;
  title: string;
  artists: {
    name: string;
    role: string;
    id: string;
  }[];
  schedule: {
    periods: string[];
    anchor: number;
  };
  genres: string[];
  freedEpisodeSize: number;
  contentsState: string;
  isPring: boolean;
  currentRank: number;
  previousRank: number;
  updatedAt: number;
  print: boolean;
  thumbnailSrc: string;
}

export interface listComicsResQuery {
  hasNext: boolean;
  count: number;
  data: ComicTypes[];
}
