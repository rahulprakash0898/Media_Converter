# 🚀 Media Converter API

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.1.0-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)](https://www.mongodb.com/)
[![Sharp](https://img.shields.io/badge/Sharp-v0.34.2-orange)](https://sharp.pixelplumbing.com/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-fluent--ffmpeg-red?logo=ffmpeg)](https://ffmpeg.org/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A robust, high-performance **Media Converter Microservice** built with Node.js, Express, MongoDB, Sharp, and FFmpeg. This API allows seamless multi-file uploading and asynchronous format conversion for images, audio, and video files.

---

## ✨ Features

- 📸 **Image Processing**: Fast image format conversions (`JPG`, `JPEG`, `PNG`, `WEBP`) powered by **Sharp**.
- 🎥 **Video & Audio Processing**: Media transcoding (`MP4`, `MP3`, `MOV`, `AVI`, `WAV`, `MKV`) powered by **FFmpeg**.
- 📦 **Batch Upload Support**: Convert up to 10 files simultaneously in a single API request via **Multer**.
- 📊 **Database Tracking**: Real-time status monitoring (`pending`, `processing`, `completed`, `failed`) logged in **MongoDB**.
- 🛠️ **Clean Architecture**: Modular structure following the Model-View-Controller (MVC) pattern with ES Modules (`import/export`).
- 🔒 **Environment Protection**: Configurable system paths and database URIs for clean deployment across local, VPS, or cloud environments.

---

## 🔁 Supported Conversions Matrix

| Category | Source Formats | Target Formats | Engine |
| :--- | :--- | :--- | :--- |
| **Images** | `.jpg`, `.jpeg`, `.png`, `.webp` | `jpg`, `jpeg`, `png`, `webp` | Sharp |
| **Video** | `.mp4`, `.mov`, `.avi`, `.mkv` | `mp4`, `mov`, `avi`, `mkv` | FFmpeg |
| **Audio** | `.mp3`, `.wav` | `mp3`, `wav` | FFmpeg |

---

## 📂 Project Structure

```text
Media_Converter/
├── src/
│   ├── config/
│   │   └── index.js            # MongoDB Connection configuration
│   ├── controllers/
│   │   └── media.controller.js  # Core logic for handling media upload & status lookup
│   ├── middlewares/
│   │   └── upload.middleware.js # Multer file upload storage configuration
│   ├── models/
│   │   └── convert.model.js    # Mongoose Schema for conversion tracking
│   ├── routes/
│   │   └── media.route.js      # API Route declarations
│   ├── utils/
│   │   ├── ffmpegConverter.js  # FFmpeg audio/video processing module
│   │   └── imageConverter.js   # Sharp image conversion module
│   └── index.js                # Server entry point
├── uploads/
│   ├── original/               # Directory for uploaded raw files
│   └── converted/              # Directory for processed output files
├── .env.example                # Template for environment configuration
├── package.json                # Project manifest and dependencies
└── README.md                   # Project documentation
```

---

## 🛠️ Prerequisites

Before running the application, make sure you have the following installed on your machine:

1. **Node.js** (v18.x or higher)
2. **MongoDB** (Running locally or a MongoDB Atlas connection URI)
3. **FFmpeg**:
   - **Linux / macOS**: Install via package manager (`sudo apt install ffmpeg` or `brew install ffmpeg`).
   - **Windows**: Download binaries and add to System PATH, or specify path in `.env`.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Define your environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Media_Format

# Optional: Set FFMPEG_PATH if FFmpeg is not added to system PATH (Windows example)
# FFMPEG_PATH="C:/ffmpeg/bin/ffmpeg.exe"
```

---

## 🚀 Installation & Running

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rahulprakash0898/Media_Converter.git
   cd Media_Converter
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`.

---

## 📡 API Reference

### 1. Health Check
Checks if the API service is online.

- **Endpoint**: `GET /`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Media Converter API Service is running"
  }
  ```

---

### 2. Upload & Convert Media
Upload one or multiple media files and convert them to the requested target format.

- **Endpoint**: `POST /api/media/upload`
- **Content-Type**: `multipart/form-data`
- **Body Fields**:
  - `files`: File or array of files (Max 10 files)
  - `format`: Desired output format string (e.g. `png`, `webp`, `mp3`, `mp4`)

#### Sample Response:
```json
{
  "code": 200,
  "message": "Files processed",
  "results": [
    {
      "id": "66da9f2a81234bc567890def",
      "original": "sample_video.avi",
      "convertedName": "1725712345678.mp4",
      "status": "completed"
    }
  ]
}
```

---

### 3. Check Conversion Status
Retrieve status details for a specific conversion record.

- **Endpoint**: `GET /api/media/status/:id`
- **Params**: `id` - Conversion document MongoDB ID

#### Sample Response:
```json
{
  "code": 200,
  "status": "completed",
  "originalName": "1725712340000-sample_video.avi",
  "convertedName": "1725712345678.mp4",
  "format": "mp4",
  "createdAt": "2026-09-07T18:00:00.000Z"
}
```

---

## 👤 Author

- **Rahul Prakash**
- **GitHub**: [@rahulprakash0898](https://github.com/rahulprakash0898)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).