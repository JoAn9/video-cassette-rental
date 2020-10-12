export type ID = string;

export interface Actor {
  id: ID;
  name: string;
  description: string;
  movies: MovieDetail[];
}

export interface ActorData {
  actor: Actor;
}

export interface ActorVars {
  id: ID;
}

export interface ActorsData {
  actors: Actor[];
}

export interface ActorInput {
  name: string;
  description: string;
}

export interface MovieDetail {
  id: ID;
  title: string;
  description: string;
  actor: Actor;
}

export interface MovieDetailData {
  movie: MovieDetail;
}

export interface MovieDetailVars {
  id: ID;
}

export interface MoviesData {
  movies: MovieDetail[];
}

export interface Message {
  id: ID;
  from: string;
  text: string;
}

export interface UserContextInterface {
  sub: string;
  name: string;
  iat: number;
}
