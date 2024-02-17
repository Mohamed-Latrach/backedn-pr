const express = require('express');
const mongoose = require('mongoose');
const app = express()


mongoose.connect('mongodb+srv://admin:admin@cluster0.cz0fnpj.mongodb.net/project-backend?retryWrites=true&w=majority')
    .then(() => {
        console.log('successfully connected to MongoDB');
        app.listen(3001,()=>{
            console.log('App serving on port 3001')
        })
    })
    .catch((err) => {
        console.log(err);
    })

