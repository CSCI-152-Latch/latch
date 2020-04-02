const express = require("express");
const request = require("request"); ///////
const config = require("config"); //////////
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Type:         GET
// Where:        api/profile
// Purpose:      Getting a specific user and their profile data for other users to view
// Access:       Private
router.get("/me", auth, async (req, res) => {
  ///added me
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["firstName", "lastName", "email", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile); //changed json
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Type:        GET
// Where:       api/profile
// Purpose:     Getting the user and profile data to the owner to see
// Acess:       Private
// router.get('/', auth, async(req, res) => {
//     try {
//         const [profile] = await Profile.find({ user: req.user.id }).populate('user');
//         console.log(profile);
//         if (!profile) {
//             return res.status(400).json({ msg: 'There is no profile for this user' });
//         }

//         res.send(profile);
//     }
//     catch (err) {
//         res.status(500).send('Server Error');
//     }
// })

// Type:         POST
// Where:        api/profile
// Purpose:      Creating a new profile for new user
// Access:       Private
// router.post(
//     '/',
//     // auth,
//     // [
//     //     check('user').notEmpty()
//     //     // check('status').notEmpty()
//     // ],
//     [
//         auth,
//         [
//           check("status", "status is required")
//             .not()
//             .isEmpty()
//         ]
//       ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ error: errors.array() });
//             }

//             const { user, status, bio, experience, field} = req.body;
//             const profile = new Profile({
//                 user,
//                 status,
//                 bio,
//                 experience,
//                 field
//             });

//             await profile.save();
//             res.send(profile);
//         }
//         catch (err) {
//             res.status(500).send(err);
//         }
//     }
// );

// module.exports = router;
// @route     POST api/profile
// @desc      Create or update  user profile
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required")
        .not()
        .isEmpty(),
      check("fields", "field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { bio, status, facebook, twitter, linkedin, fields } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    //if (company) profileFields.company = company;
    //if (website) profileFields.website = website;
    //if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    //if (githubusername) profileFields.githubusername = githubusername;
    if (fields) {
      profileFields.fields = fields.split(",").map(field => field.trim());
    }

    //build social object
    profileFields.social = {};
    //if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    //if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route     get api/profile
// @desc      Get all Profiles
// @access    Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "firstName",
      "lastName",
      "email",
      "avatar"
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route     get api/profile/user/:user_id ":user_id is just a place holder"
// @desc      get profile by user id
// @access    Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["firstName", "lastName", "email", "avatar"]); //ep18

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      //"objectID is a kind of error so we are checking if the object id is messed up"
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("server error");
  }
});

// @route     DELETE api/profile
// @desc      Delete profile, user, & posts
// @access    Private

router.delete("/", auth, async (req, res) => {
  try {
    //@to do - remove users posts
    //possibly might do this probably not ?
    //await Post.deleteMany({user: req.user.id})///make sure to include post model up top.
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route     ADD api/profile/experience
// @desc      add profile experience
// @access    Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("company", "company is required")
        .not()
        .isEmpty(),
      check("from", "from date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route     DELETE api/profile/experience/:exp_id
// @desc      Delete experience from profile
// @access    Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get the remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route     ADD api/profile/education
// @desc      add profile education
// @access    Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "fild of study is required")
        .not()
        .isEmpty(),
      check("from", "from date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route     DELETE api/profile/education/:edu_id
// @desc      Delete education from profile
// @access    Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get the remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
