const express = require("express");
const request = require("request"); ///////
const config = require("config"); //////////
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif", "text/plain"];

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Documents = require("../../models/Document");

//get all documents
// router.get("/", async (req, res) => {
//   res.send("documents up and running");
// });
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
      //check("coverImageType", "coverImageType is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //notepad has the comment code jsut in case

    try {
      const user = await User.findById(req.user.id).select("-password");
      const documentFields = new Documents({
        title: req.body.title,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        user: req.user.id,
      });
      saveCover(documentFields, req.body.cover);
      const document = await documentFields.save();
      res.json(document);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

function saveCover(documentFields, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    documentFields.coverImage = new Buffer.from(cover.data, "base64");
    documentFields.coverImageType = cover.type;
  }
}
module.exports = router;
