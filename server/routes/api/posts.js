const express = require('express');

const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
});


// Function Load Post
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://jaki:dearsh24x1@ds135003.mlab.com:35003/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}
module.exports = router;