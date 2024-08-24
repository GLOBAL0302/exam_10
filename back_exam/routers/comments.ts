import express from "express";
import mysqlDB from '../mysqlDb';
import { ICommentMutation, IComments, INews } from '../types';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader } from 'mysql2';


const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
  const result =  await mysqlDB.getConnection().query("SELECT * FROM comments");
  const comments = result[0] as IComments[];
  return res.send(comments);
})

commentsRouter.post("/", async (req, res,next) => {
  try{
    const newComment:ICommentMutation = {
      news_id: req.body.news_id,
      author: req.body.author ? req.body.author : "Anonymous",
      description: req.body.description
    }
    const checkIfIdExist = await mysqlDB
      .getConnection().query('SELECT * FROM news WHERE id=?',[newComment.news_id])
    const result = checkIfIdExist[0] as INews[]
    if(result.length === 0){
      return res.status(404).send({error:`can not find news with id ${newComment.news_id}`})
    }

    const updateComments = await mysqlDB
      .getConnection()
      .query('INSERT INTO comments (news_id, author, description) VALUE (?,?,?)',
        [newComment.news_id, newComment.author, newComment.description])


    const resultHeader = updateComments[0] as ResultSetHeader
    const getNewResult = await mysqlDB
      .getConnection()
      .query('SELECT * FROM comments WHERE id=?', [resultHeader.insertId])
    res.send(getNewResult[0]);

  }catch(err){
    next(err)
  }
})

commentsRouter.get("/:id", async (req, res,next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDB
      .getConnection()
      .query('SELECT * FROM comments WHERE id=?', [id])

    const comments = result[0] as IComments[]
    if(comments.length === 0){
      return res.status(404).send({error:`can not find comments with id ${id}`})
    }
    res.send(comments[0]);
  }catch (e){
    next(e)
  }
})

commentsRouter.delete("/:id", async (req, res,next) => {
  try{
    const id = req.params.id;
    await mysqlDB.getConnection().query('DELETE FROM comments WHERE id=?',[id])
    res.send(`Deleted comments by ID ${id}`)
  }catch(err){
    next(err)
  }
})








export default commentsRouter