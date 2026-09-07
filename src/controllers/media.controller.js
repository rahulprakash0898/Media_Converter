//Adding Multiple Images

import path from 'path';
import Convert from '../models/convert.model.js';
import { convertWithFFmpeg } from '../utils/ffmpegConverter.js';
import { convertImage } from '../utils/imageConverter.js';

export const uploadMedia = async (req, res) => {
  const files = req.files;
  const format = req.body.format;

  if (!files || files.length === 0) {
    return res.json({ code: 200, message: 'No files uploaded' });
  }

  const results = [];

  for (const file of files) {
    const newConvert = await Convert.create({
      originalName: file.filename,
      format,
      status: 'processing',
    });

    const inputPath = path.join('uploads/original', file.filename);

    try {
      let result;
      const ext = path.extname(file.originalname).toLowerCase();
      const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
      const videoAudioExts = ['.mp4', '.mp3', '.mov', '.avi', '.wav', '.mkv'];

      if (imageExts.includes(ext)) {
        result = await convertImage(inputPath, format);
      } else if (videoAudioExts.includes(ext)) {
        result = await convertWithFFmpeg(inputPath, format);
      } else {
        throw new Error('Unsupported file type');
      }

      newConvert.status = 'completed';
      newConvert.convertedName = result.outputName;
      await newConvert.save();

      results.push({
        id: newConvert._id,
        original: file.originalname,
        convertedName: result.outputName,
        status: 'completed'
      });
    } catch (err) {
      newConvert.status = 'failed';
      await newConvert.save();
      results.push({
        id: newConvert._id,
        original: file.originalname,
        status: 'failed',
        error: err.message
      });
    }
  }

  res.json({
    code: 200,
    message: 'Files processed',
    results
  });
};

export const getStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const conversion = await Convert.findById(id);

    if (!conversion) {
      return res.status(404).json({ code: 404, message: 'Conversion not found' });
    }

    res.json({
      code: 200,
      status: conversion.status,
      originalName: conversion.originalName,
      convertedName: conversion.convertedName,
      format: conversion.format,
      createdAt: conversion.createdAt
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'Server error', error: err.message });
  }
};