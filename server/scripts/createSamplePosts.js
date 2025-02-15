const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const samplePosts = [
    {
        title: 'Getting Started with React and Vite',
        content: `React is a powerful JavaScript library for building user interfaces, and Vite is a modern build tool that offers lightning-fast development experience. In this post, we'll explore how to set up a new React project using Vite and understand its key benefits.

First, let's look at why Vite is becoming increasingly popular in the React ecosystem. Unlike traditional bundlers, Vite leverages native ES modules to offer instantaneous server start and lightning-fast hot module replacement (HMR).

Key benefits of using Vite:
1. Instant server start
2. Lightning-fast HMR
3. Optimized build process
4. Out-of-the-box TypeScript support

Let's dive into the code and see how it works!`,
        tags: ['react', 'vite', 'javascript', 'web development']
    },
    {
        title: 'Understanding OAuth 2.0 Authentication',
        content: `OAuth 2.0 is an industry-standard protocol for authorization that enables applications to obtain limited access to user accounts on an HTTP service. It's widely used by major tech companies and provides a secure way to authenticate users.

The OAuth 2.0 flow typically involves these steps:
1. Client Registration
2. User Authorization
3. Token Exchange
4. Resource Access

In this post, we'll explore how OAuth works and implement it in a Node.js application using Passport.js.`,
        tags: ['oauth', 'authentication', 'security', 'nodejs']
    },
    {
        title: 'Building RESTful APIs with Express and MongoDB',
        content: `Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. When combined with MongoDB, it creates a powerful stack for building modern web applications.

Key topics we'll cover:
1. Setting up Express server
2. Connecting to MongoDB
3. Creating RESTful routes
4. Implementing CRUD operations
5. Error handling and validation

Let's explore how to build a scalable API!`,
        tags: ['express', 'mongodb', 'nodejs', 'api']
    }
];

async function createSamplePosts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Create a test user if it doesn't exist
        let user = await User.findOne({ email: 'test@example.com' });
        if (!user) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = await User.create({
                username: 'testuser',
                email: 'test@example.com',
                password: hashedPassword
            });
            console.log('Created test user');
        }

        // Create posts
        for (const postData of samplePosts) {
            const post = await Post.create({
                ...postData,
                author: user._id
            });
            console.log(`Created post: ${post.title}`);
        }

        console.log('Sample posts created successfully');
    } catch (error) {
        console.error('Error creating sample posts:', error);
    } finally {
        await mongoose.connection.close();
    }
}

createSamplePosts();
