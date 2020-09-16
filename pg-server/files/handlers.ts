import AWS, { S3 } from 'aws-sdk';
import sharp from 'sharp';
import fileType from 'file-type';
import fs from 'fs';
import bluebird from 'bluebird';

AWS.config.update({
  accessKeyId: process.env.DANIK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DANIK_AWS_SECRET_ACCESS_KEY,
});

AWS.config.setPromisesDependency(bluebird);

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
  const type = fileType(largeFileBuffer);
  if (!type) {
    throw new Error('Formato de arquivo inválido');
  }
  const timestamp = Date.now().toString();
  const largeFileName = `products/${timestamp}-lg`;
  const metadata = await sharp(filePath).metadata();
  if (!/^(jpg|jpeg|png)$/.test(metadata.format || '')) {
    throw new Error('Formato de arquivo inválido');
  }
  if ((metadata.width && metadata.width < 580) || (metadata.height && metadata.height < 580)) {
    throw new Error('Altura ou largura menor que 580 pixels');
  }
  const smallFileBuffer = await sharp(filePath).resize(140).toBuffer();
  const smallFileName = `products/${timestamp}-sm`;
  return bluebird.all([
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
      Objects: imageUrls.map(image => ({ Key: image })),
    },
  };
  return s3.deleteObjects(params).promise();
};
