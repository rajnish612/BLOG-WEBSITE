const express = require('express');
const router = express.Router();
const { 
    createPost, 
    getPosts, 
    getPost, 
    updatePost, 
    deletePost,
    addComment
} = require('../controllers/postController');
const auth = require('../middleware/auth');
const multer = require('multer');

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, upload.single('image'), createPost);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', getPost);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', auth, upload.single('image'), updatePost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, deletePost);

// @route   POST api/posts/:id/comments
// @desc    Add comment to post
// @access  Private
router.post('/:id/comments', auth, addComment);

module.exports = router;
