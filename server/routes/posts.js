const express = require('express')
const router = express.Router()
const { posts } = require("../models"); //get an instance of the posts model we created (db)

router.get("/", async (req, res) => {
   // res.send("Hello World");
    // sending json
    // res.json("Hello World");
    const listOfPosts = await posts.findAll();
    res.json(listOfPosts);

});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await posts.findByPk(id)
    res.json(post);
});

router.post("/", async (req, res) => {
    const post = req.body
    //so now u can acccess something like post.title
    await posts.create(post); // [sequelize function] create the post req body's data into posts table, rip English
    res.json(post); //return the post for our own visual confirmation

})


module.exports = router
