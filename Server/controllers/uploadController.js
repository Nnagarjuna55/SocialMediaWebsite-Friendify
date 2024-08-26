// //Multer is used for handling file uploads in Express applications.
// const multer = require("multer")

// //Creates an instance of an Express router to handle routes related to file uploads.
// const uploadRouter = require("express").Router()

// //destination:

// //Specifies the directory where uploaded files will be stored.
// //cb(null, 'public/images') tells Multer to save the files in the public/images directory.
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//        cb(null, 'public/images')
//     },

//     //filename:

// //Specifies the filename of the uploaded file.
// //cb(null, req.body.imageUrl) uses the value of req.body.imageUrl from the request body as the filename.
//     filename: (req, file, cb) => {
//       cb(null, req.body.imageUrl)
//     }
// })

// //Creates a Multer instance with the configured storage settings.
// const upload = multer({ storage: storage });

// uploadRouter.post('/', upload.single('photo'), (req, res) => {
//     console.log(req.body)
//     try {
//         return res.status(201).json({msg: 'Successfully uploaded'})
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// })

// module.exports = uploadRouter




// const multer = require('multer');
// const express = require('express');
// const uploadRouter = express.Router();

// // Storage configurations for images
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.mediaUrl || file.originalname);
//   }
// });

// // Storage configurations for videos
// const videoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/videos');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.mediaUrl || file.originalname);
//   }
// });

// // Multer instances for image and video uploads
// const uploadImage = multer({ storage: imageStorage });
// const uploadVideo = multer({ storage: videoStorage });

// // Route to handle image upload
// uploadRouter.post('/image', uploadImage.single('photo'), (req, res) => {
//   console.log('Request Body:', req.body);
//   console.log('Uploaded File:', req.file);
//   try {
//     return res.status(201).json({ msg: 'Image successfully uploaded' });
//   } catch (error) {
//     console.error('Image upload error:', error);
//     return res.status(500).json(error);
//   }
// });

// // Route to handle video upload
// uploadRouter.post('/video', uploadVideo.single('video'), (req, res) => {
//   try {
//     return res.status(201).json({ msg: 'Video successfully uploaded' });
//   } catch (error) {
//     console.error('video upload error:', error);
//     return res.status(500).json(error);
//   }
// });

// module.exports = uploadRouter;


// const uploadRouter = require("express").Router();
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const type = file.mimetype.split('/')[0];
//         cb(null, `public/${type}s`);
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.mediaUrl);
//     }
// });

// const upload = multer({ storage: storage });

// uploadRouter.post('/', upload.single('media'), (req, res) => {
//   console.log("Received Body:", req.body);  // Logs the non-file fields
//   console.log("Received File:", req.file);  // Logs the file details
//   try {
//       return res.status(201).json({ msg: 'Successfully uploaded' });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json(error);
//   }
// });


// module.exports = uploadRouter;


// const express = require('express');
// //Multer: A middleware for handling multipart/form-data, which is primarily used for uploading files.
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const type = file.mimetype.split('/')[0];
//         cb(null, `public/${type}s`);
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.mediaUrl);
//     }
// });

// const upload = multer({ storage: storage });

// const uploadRouter = express.Router();

// uploadRouter.post('/', upload.single('media'), (req, res) => {
//     console.log("Received Body:", req.body);  // Logs the non-file fields
//     console.log("Received File:", req.file);  // Logs the file details
//     try {
//         return res.status(201).json({ msg: 'Successfully uploaded' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json(error);
//     }
// });

// module.exports = uploadRouter;





const express = require('express');
const multer = require('multer');
const path = require('path');

// Updated the filename function to generate a unique filename if mediaUrl is not provided.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = file.mimetype.split('/')[0];
        cb(null, `public/${type}s`);
    },
    filename: (req, file, cb) => {
        const filename = req.body.mediaUrl || `${Date.now()}-${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('media'), (req, res) => {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);
    try {
        return res.status(201).json({ msg: 'Successfully uploaded', filePath: `/images/${req.file.filename}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

module.exports = uploadRouter;
