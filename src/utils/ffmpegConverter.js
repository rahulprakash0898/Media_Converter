import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.FFMPEG_PATH) {
  ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
}

export const convertWithFFmpeg = (inputPath, format) => {
  const outputName = `${Date.now()}.${format}`;
  const outputPath = path.join('uploads/converted', outputName);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat(format)
      .on('end', () => resolve({ outputPath, outputName }))
      .on('error', reject)
      .save(outputPath);
  });
};