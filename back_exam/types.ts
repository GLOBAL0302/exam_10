export interface INews {
  id:number,
  title:string,
  description:string,
  image:string,
  create_at:string
}

export interface IComments{
  id:number,
  news_id:number,
  author:string,
  description:string,
}

export type ICommentMutation = Omit<IComments, 'id'>;