const express = require("express");
const router = express.Router();

//Get   api/posts
//      test route
//      public (no token needed)
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;
