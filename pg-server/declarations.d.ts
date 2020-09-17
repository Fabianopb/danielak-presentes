declare module 'file-type' {
  export default function fileType(buffer: Buffer): { ext: string; mime: string } | undefined;
}
