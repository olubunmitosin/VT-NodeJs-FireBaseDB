const db = require("../firebase.js");
const Post = require("../models/post.model.js");
const write_logs = require("../utilities/loggerService.js");
const { validateRequest } = require("../utilities/validationService");
const { createPostRules, updatePostRules } = require("../requests/post_request");
const { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');
const { initialResponseParameters, getLogData, errorLog, responseStructure } = require("../utilities/utilityService");


/**
 * Get posts
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getPosts = async (req, res) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Try block
    try {
        const posts = await getDocs(collection(db, 'posts'));
        const postsArray = [];

        if (posts.empty == true) {
            responseMessage = "No Posts found!";
            
        } else {
            posts.forEach((doc) => {
                const post = new Post(
                    doc.id,
                    doc.data().title,
                    doc.data().content
                );
                postsArray.push(post);
            });
            // Set posts to response data
            responseData = postsArray;
            responseMessage = "Query ok";
        }
        statusValue = true;

    } catch (e) {
        responseMessage = "An error occurred";
        error = errorLog(e);
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    write_logs(getLogData(req, error ? error : response, 'get titles'));
    res.send(response);
}


/**
 * Create Post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createPost = async (req, res) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, createPostRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }

    // Try block
    try {
        const data = req.body;
        // Create new post
        await addDoc(collection(db, 'posts'), data);
        responseMessage = "Post created successfully";
        statusValue = true;

    } catch (e) {
        responseMessage = "An error occurred";
        error = errorLog(e);
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    write_logs(getLogData(req, error ? error : response, 'get titles'));
    res.send(response);
}

/**
 * Update Post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updatePost = async (req, res) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, updatePostRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }

    // Try block
    try {
        
        const data = req.body;
        const id = data.id;
        const post = doc(db, 'posts', id);

        // update post
        await updateDoc(post, data);

        responseMessage = "Post updated successfully!"
        statusValue = true;

    } catch (e) {
        responseMessage = e.message;
        error = errorLog(e);
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    write_logs(getLogData(req, error ? error : response, 'update posts'));
    res.send(response);
}



/**
 * Get single post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getSinglePost = async (req, res) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Try block
    try {
        const id = req.params.id;
        // Create new post
        const post = doc(db, 'posts', id);
        const data = await getDoc(post);
        if (data.exists()) {

            responseMessage = "Query ok!";
            responseData = data.data();
            statusValue = true;

        } else {
            responseMessage = "Post not found!";
        }

    } catch (e) {
        responseMessage = e.message;
        error = errorLog(e);
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    write_logs(getLogData(req, error ? error : response, 'get single post'));
    res.send(response);
}


/**
 * Delete post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deletePost = async (req, res) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Try block
    try {
        const data = req.body;
        // Delete post
        await deleteDoc(doc(db, 'posts', data.id));

        responseMessage = "Post deleted successfully!";
        statusValue = true;

    } catch (e) {
        responseMessage = e.message;
        error = errorLog(e);
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    write_logs(getLogData(req, error ? error : response, 'get single post'));
    res.send(response);
}
