const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");

// @route    get api/posts
// @desc     get all posts
// @access   Private
router.get('/posts', auth, async (_, res) => {
    try {

        // -1 brings most recent first
        const posts = await Post.find()
                                .sort({ date: -1 })
                                .populate([
                                    {
                                        path: 'user',
                                        model: 'users'
                                    },
                                    {
                                        path: 'comments._id',
                                        model: 'users'
                                    }
                                ]); 
        res.json(posts);
    } 
    catch (err) {
        res.status(500).send('Server Error');
    }
});
  
// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
    "/create",
    [
        auth,
        [
            check("text", "Text is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const userID = req.user.id;
            const { text } = req.body;
            const newPost = await Post.create(
                {
                    user: userID,
                    text: text
                }
            );
            // console.log(newPost);
            res.json(newPost);
        } 
        catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
    "/addcomment",
    [
        auth,
        [
            check("text", "Text is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const userID = req.user.id;
            const { text, postID } = req.body;
            await Post.findByIdAndUpdate(
                postID,
                {
                    '$push': {
                        'comments': {
                            '_id': userID,
                            'text': text
                        }
                    }
                },
                {
                    'new': true
                }
            ).populate({
                path: 'comments._id',
                select: 'firstName lastName avatar _id',
                model: 'users'
            });

            // res.json(posts);

            const posts = await Post.find()
                                .sort({ date: -1 })
                                .populate([
                                    {
                                        path: 'user',
                                        model: 'users'
                                    },
                                    {
                                        path: 'comments._id',
                                        model: 'users'
                                    }
                                ]); 
            res.json(posts);
        } 
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// @route    get api/posts/:id
// @desc     GET post by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
        return res.status(404).json({ msg: "post not found" });
        }

        res.json(post);
    } 
    catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {///object id is a property that err has.
            return res.status(404).json({ msg: "post not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    await post.remove();

    res.json({ msg: "post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     like a post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked by user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "post was already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("sever error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     like a post
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked by user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "post has not yet been liked" });
    }

    //get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);//this removes the one name from array

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("sever error");
  }
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //pull  out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "comment does not exist" });
    }

    //check user is the one who actually posted comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    //get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
