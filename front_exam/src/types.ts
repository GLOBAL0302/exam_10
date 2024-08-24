export interface newsMutation {
  title: string;
  description: string;
  image: string | null;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  image: string | null;
  create_at: string;
}

export type IApiNews = Omit<INews, 'description'>;
