import { Router } from 'express';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';
import authorize from '../auth/authorize';
import { processAndUploadFile } from './handlers';
import { deleteFiles } from '../../src/api';

const router = Router();

router.post('/files/upload', authorize, async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      throw new Error(error.message);
    }
    const data = await processAndUploadFile(files.file[0].path);
    return res.status(200).send(data);
  });
});

router.post('/files/delete', authorize, bodyParser.json(), async (req, res) => {
  const data = deleteFiles(req.body.images);
  return res.status(200).send(data);
});

export default router;
