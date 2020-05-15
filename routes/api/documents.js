//import * as Filepond from "../../JavaScripts/fileUpload";
const express = require("express");
const request = require("request"); ///////
const config = require("config"); //////////
const router = express.Router();
const fileUpload = require("express-fileupload");
const auth = require("../../middleware/auth"); //will be implemented later.....
const { check, validationResult } = require("express-validator");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Documents = require("../../models/Document");


// router.get("/", async (req, res) => {
//   res.send("documents up and running");
// });
//get all documents
router.get("/", async (req, res) => {
  try {
    const documents = await Documents.find().sort({ date: -1 }); //-1 brings most recent first
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//from the post route
///create new document
router.post(
  "/",
  [
    //auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("pageCount", "pageCount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    console.log(req.body, "req.body");
    console.log(req.files, "req.files");
    //notepad has the comment code jsut in case
    //const { title, publishDate, pageCount, cover, description  } = req.body;
    const { title, publishDate, pageCount, description } = req.body;
    const { cover } = req.files;
    //const cover = req.files.[0];
    console.log(cover,'cover field');
    try {
      //const user = await User.findById(req.user.id).select("-password");
      //const cover1 = JSON.parse(cover)
      //console.log(cover1);
      const documentFields = new Documents({
        title: title,
        publishDate: new Date(publishDate),
        pageCount: pageCount,
        description: description,
        //coverImage: new Buffer.from(cover1.data, "base64"),
        coverImage: cover.name,
        //coverImageType: cover1.type,
        //coverImageType: cover.mimetype,
        //coverImageBuffer:cover.data
      });
      saveCover(documentFields, cover);
      const document = await documentFields.save();
      res.json(document);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error routes");
    }
    console.log(__dirname, "console logging");
    //fix this later.........
    cover.mv(`client/public/uploads/${cover.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      //console.log(87);
      //console.log( new Buffer.from(cover.data, "base64"));
      //res.json({ fileName: cover.name, filePath: `/uploads/${cover.name}` });
    });
  }
);

function saveCover(documentFields, coverEncoded) {
  console.log(coverEncoded, "from functions");
  if (coverEncoded == null) return;
//JSON.parse(coverEncoded);
  const cover = coverEncoded; 

  if (cover != null && imageMimeTypes.includes(cover.mimetype)) {
    documentFields.coverImageBuffer = new Buffer.from(cover.data, "base64");
    documentFields.coverImageType = cover.mimetype;
  }
}
module.exports = router;

// app.post('/upload', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });
