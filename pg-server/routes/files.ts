import AWS, { S3 } from 'aws-sdk';
import sharp from 'sharp';
import FileType from 'file-type';
import fs from 'fs';
import { Router } from 'express';
import multiparty from 'multiparty';
import auth from '../auth';

AWS.config.update({
  accessKeyId: process.env.DANIK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DANIK_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadFile = (buffer: S3.Body, name: string, type: { ext: string; mime: string }) => {
  if (!process.env.DANIK_S3_BUCKET) {
    throw new Error('process.env.DANIK_S3_BUCKET is not defined');
  }
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.DANIK_S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

export const processAndUploadFile = async (filePath: string) => {
  const largeFileBuffer = fs.readFileSync(filePath);

  const type = await FileType.fromBuffer(largeFileBuffer);
  if (!type) {
    throw new Error('File type could not be defined!');
  }

  if (!['jpg', 'jpeg', 'png'].includes(type.ext)) {
    throw new Error('Formato de arquivo inválido');
  }

  const metadata = await sharp(filePath).metadata();
  if ((metadata.width && metadata.width < 580) || (metadata.height && metadata.height < 580)) {
    throw new Error('Altura ou largura menor que 580 pixels');
  }

  const smallFileBuffer = await sharp(filePath).resize(140).toBuffer();

  const timestamp = Date.now().toString();
  const largeFileName = `products/${timestamp}-lg`;
  const smallFileName = `products/${timestamp}-sm`;
  return Promise.all([
    uploadFile(largeFileBuffer, largeFileName, type),
    uploadFile(smallFileBuffer, smallFileName, type),
  ]);
};

export const deleteImageFiles = (imageUrls: string[]) => {
  if (!process.env.DANIK_S3_BUCKET) {
    throw new Error('process.env.DANIK_S3_BUCKET is not defined');
  }
  const params = {
    Bucket: process.env.DANIK_S3_BUCKET,
    Delete: {
      Objects: imageUrls.map((image) => ({ Key: image })),
    },
  };
  return s3.deleteObjects(params).promise();
};

const filesRouter = Router();

filesRouter.post('/files/upload', auth, async (req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).send(error);
    }
    try {
      const data = await processAndUploadFile(files.file[0].path);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  });
});

filesRouter.post('/files/delete', auth, async (req, res, next) => {
  try {
    const data = await deleteImageFiles(req.body.images);
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
