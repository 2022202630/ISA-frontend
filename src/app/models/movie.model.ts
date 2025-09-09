export interface Movie {
  id: number;
  name: string;
  duration: number;
  genres: { id: number; name: string }[];
  director?: { id: number; name: string };
  actors?: { id: number; name: string }[];

  // Frontend-only helper field
  genreList?: string;
}
