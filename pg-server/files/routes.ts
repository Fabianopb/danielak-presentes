import { Router } from 'express';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';
import authorize from '../auth/authorize';
import { processAndUploadFile, deleteImageFiles } from './handlers';
import { asyncHandler } from '../utils';

const router = Router();

router.post(
  '/files/upload',
  authorize,
  asyncHandler(async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send(error);
      }
      try {
        const data = await processAndUploadFile(files.file[0].path);
        return res.status(200).send(data);
      } catch (err) {
        return res.status(400).send(err);
      }
    });
  }),
);

router.post(
  '/files/delete',
  authorize,
  bodyParser.json(),
  asyncHandler(async (req, res) => {
    const data = await deleteImageFiles(req.body.images);
    return res.status(200).send(data);
  }),
);

export default router;
