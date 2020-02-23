const express = require("express");
const router = express.Router();

//Get   api/profile
//      test route
//      public (no token needed)
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
