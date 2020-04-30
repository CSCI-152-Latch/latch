const express = require("express");
const request = require("request"); ///////
const config = require("config"); //////////
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Job = require("../../models/Job");

// @route     POST api/job
// @desc      Create job
// @access    Private
router.post(
  "/",
  [
    //auth,
    [
      check("organization", "organization is required").not().isEmpty(),
      check("titlej", "titlej is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("typej", "typej is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      organization,
      titlej,
      description,
      typej,
      qualifications,
      endDate,
    } = req.body;

    //build profile object
    const jobFields = {};

    if (organization) jobFields.organization = organization;
    if (titlej) jobFields.titlej = titlej;
    if (description) jobFields.description = description;
    if (typej) jobFields.typej = typej;
    if (endDate) jobFields.endDate = endDate;
    if (qualifications) {
      jobFields.qualifications = qualifications
        .split(",")
        .map((qualification) => qualification.trim());
    }

    try {
      //create
      job = new Job(jobFields);
      await job.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
// @route     Get api/job
// @desc      get all jobs
// @access    Private
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 }); //-1 brings most recent first
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Get api/job/:_id
// @desc      get job by id
// @access    Private
router.get("/job/:job_id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.job_id });

    if (!job) return res.status(400).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      //"objectID is a kind of error so we are checking if the object id is messed up"
      return res.status(400).json({ msg: "Job not found" });
    }

    res.status(500).send("server error");
  }
});

// @route     POST api/job/apply/:_id
// @desc      applying to job
// @access    Private
router.put("/job/apply/:job_id/:user_id", auth, async (req, res) => {
  const newApp = {
    applicants: req.params.user_id,
  };
  try {
    const job = await Job.findOne({
      _id: req.params.job_id,
    });

    if (!job) return res.status(400).json({ msg: "Job not found" });
    job.applicants.unshift(newApp);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      //"objectID is a kind of error so we are checking if the object id is messed up"
      return res.status(400).json({ msg: "Job not found" });
    }

    res.status(500).send("server error");
  }
});

// @route     DELETE api/job/delete/:_id
// @desc      delete a job
// @access    Private
// router.delete(
//   "/delete/:job_id",
//   /*auth,*/ async (req, res) => {
//     try {
//       //@to do - remove users posts
//       //possibly might do this probably not ?
//       //await Post.deleteMany({user: req.user.id})///make sure to include post model up top.
//       //remove profile
//       await Job.findOneAndRemove({ _id: req.params.job_id });

//       res.json({ msg: "Job deleted" });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("server error");
//     }
//   }
// );
router.delete(
  "/delete",
  /*auth,*/ async (req, res) => {
    try {
      //@to do - remove users posts
      //possibly might do this probably not ?
      //await Post.deleteMany({user: req.user.id})///make sure to include post model up top.
      //remove profile
     
      const { idj } = req.body;
      console.log(req.body,"req.body");
      await Job.findOneAndRemove({ _id: idj });
      console.log('line 156')
      res.json({ msg: "Job deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
