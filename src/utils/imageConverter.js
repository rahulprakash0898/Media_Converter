import sharp from 'sharp';
import path from 'path';

export const convertImage = async (inputPath, format) => {
  const outputName = `${Date.now()}.${format}`;
  const outputPath = path.join('uploads/converted', outputName);

  await sharp(inputPath)
    .toFormat(format)
    .toFile(outputPath);

  return { outputPath, outputName };
};