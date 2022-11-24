const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config

const videos = ["GoLJJRIWCLU","BbWBRnDK_AE","LCJblaUkkfc","u5CVsCnxyXg","DXP1KdZX4io"]

app.get('/api/videos', function(req, res){
    res.send(videos)
})

// if(process.env.NODE_ENV != 'development'){
    app.use(express.static(path.join(__dirname, 'front/build')))

    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'front/build/index.html',function(error){
            if (error){
                res.status(500).send(error)
            }
        }))
    })
// }

app.listen(3000,()=>(
    console.log('listening on port 3000')
))