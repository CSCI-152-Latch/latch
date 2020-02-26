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
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user',
            ['name', 'avatar']
        );
        
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.send(profile);
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
});

module.exports = router;
