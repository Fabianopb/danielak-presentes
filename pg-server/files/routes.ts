import { Router } from 'express';
import multiparty from 'multiparty';
import { processAndUploadFile, deleteImageFiles } from './handlers';
import { asyncHandler } from '../utils';
import auth from '../auth';

const router = Router();

router.post(
  '/files/upload',
  auth,
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
  })
);

router.post(
  '/files/delete',
  auth,
  asyncHandler(async (req, res) => {
    const data = await deleteImageFiles(req.body.images);
    return res.status(200).send(data);
  })
);

export default router;
