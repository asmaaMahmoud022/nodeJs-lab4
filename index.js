const express = require("express")
const userRouter = require("./routes/users")
const postRouter = require("./routes/posts")
const ratingRouter = require("./routes/ratings")
const mongoose = require("mongoose")
const app= express()
const port = 3000

app.use(express.json())
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/ratings',ratingRouter)
mongoose.connect('mongodb://localhost:27017/mydb',(err) => {
    if(err)
    {
        console.error(err)
        return
    }else{
        console.log("connected to db successfully")
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
