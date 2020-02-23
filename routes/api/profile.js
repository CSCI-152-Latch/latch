const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//Get   api/profile
//      test route
//      public (no token needed)
router.get("/", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        if (!profile) {
            return res.send('Invalid profile');
        }

        res.send(profile);
    }
    catch (err) {
        res.status(500).send('Invalid stuff');
    }
});

module.exports = router;
