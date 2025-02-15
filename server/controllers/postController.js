const Post = require('../models/Post');

// Create new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const post = new Post({
            title,
            content,
            categories,
            tags,
            author: req.user.id,
            image: req.file ? req.file.path : ''
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username email profilePicture')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username email profilePicture')
            .populate('comments.user', 'username profilePicture');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the author
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                categories,
                tags,
                image: req.file ? req.file.path : post.image
            },
            { new: true }
        ).populate('author', 'username email profilePicture');

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the author
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await post.remove();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add comment
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            text: req.body.text,
            user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();

        const populatedPost = await Post.findById(req.params.id)
            .populate('author', 'username email profilePicture')
            .populate('comments.user', 'username profilePicture');

        res.json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
