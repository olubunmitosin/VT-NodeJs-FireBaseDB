const express = require('express');
const postController = require("../controllers/post.controller.js");
const router = express.Router();

module.exports = app => {
    // Common routes
    router.get("/all", postController.getPosts);
    router.get("/single/:id", postController.getSinglePost);
    router.post("/create", postController.createPost);
    router.post("/update", postController.updatePost);
    router.post("/delete", postController.deletePost);

    // Load router routes into app base url
    app.use('/api/posts', router);
};