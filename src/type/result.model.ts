type ResultModel = {
  resultCount: number;
  results: results[];
};

type results = {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  artworkUrl30: string;
  artworkUrl60: string;
  collectionExplicitness: string;
  collectionPrice: number;
  country: string;
  currency: string;
  kind: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
};

export type { ResultModel, results };
