const { Router } = require('express');
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json()); //to get json input obj using express
app.use(cors());

const db = require('./models');
//import, looks through all dtbase files in models folder

//routers
const postRouter = require('./routes/posts')
app.use("/posts", postRouter)
const commentsRouter = require('./routes/Comments')
app.use("/comments", commentsRouter)
const usersRouter = require('./routes/users')
app.use("/auth", usersRouter)

//entrypoint of our API
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Running on port 3001');
        //basically run this function when you are on port 3001
    });
});
