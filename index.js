//config of express.js
const express = require('express')
const app = express();
//config of mongoose/MongoDb
const mongoose = require('mongoose')
//config the use of .env files
require('dotenv').config();
//set up views folder
app.set('views', './views')
app.set('view engine', 'ejs')
//set up access to static files 
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

//Port specified at port 8080
const PORT = process.env.PORT || 8080

//connect to mongoose database
mongoose.connect(process.env.connectionString)
.then(() => console.log('Connected to MongoDB Database'))
.catch((err) => console.log(`Error occurred connecting to database: ${err}`));

//create a new schema for each Note (Blueprint)
const NoteSchema = new mongoose.Schema ({
    title: String, // The title of the note
    content: String, // The content of the note
    author: String, // The author of the note
    dateCreated: Date, // The date when the note was created
    dateModified: Date, // The date when the note was last modified
    tags: [String], // Tags for categorizing the note
    sharedWith: [String], // List of users with whom the note is shared
    comments: [{ // Comments on the note
        commentText: String,
        commentedBy: String,
        commentDate: Date
    }]
})

//create the Note model
const Note = mongoose.model('note', NoteSchema)

app.get('/', (req, res) => {
    try {
        res.status(200).render('index', {title: 'NotePad Application'})
    } catch (err) {
        console.log(err);
    }
})



//set up express server
app.listen(PORT, () => {
    try {
        console.log(`Server started at PORT: ${PORT} | http://localhost:8080`)
    } catch (err) {
        console.log(`Error occurred: ${err}`)
    }
})