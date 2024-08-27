import express from 'express';
import mysqlDB from '../mysqlDb';
import { ResultSetHeader } from 'mysql2';
import mysqlDb from '../mysqlDb';
import { IComments, INews } from '../types';
import { imagesUpload } from '../multer';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  const result = await mysqlDb.getConnection().query('SELECT id, title, image, create_at FROM news');

  const news = result[0];
  return res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query('SELECT * FROM news WHERE id= ?', [id]);

  const news = result[0] as INews[];

  if (news.length === 0) {
    return res.status(404).send({ error: 'No news by ID' + id + ' found' });
  }
  return res.send(news[0]);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(404).send({ error: 'there is no title or description' });
  }

  const newReport = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

  const insertResult = await mysqlDb
    .getConnection()
    .query('INSERT INTO news (title, description, image) VALUE(?,?,?)', [
      newReport.title,
      newReport.description,
      newReport.image,
    ]);

  const resultHeader = insertResult[0] as ResultSetHeader;
  const getNewResult = await mysqlDb.getConnection().query('SELECT * FROM news WHERE id=?', [resultHeader.insertId]);

  const news = getNewResult[0] as INews[];
  return res.send(news[0]);
});

newsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await mysqlDB.getConnection().query('DELETE FROM comments WHERE news_id = ?', [id]);
  const deleted = await mysqlDb.getConnection().query('DELETE FROM news WHERE id=?', [id]);

  return res.send(`Deleted news by ID ${id}`);
});

export default newsRouter;
