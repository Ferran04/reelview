const express = require('express');
const app = express();

const port = 5000;

const cors = require('cors');
app.use(cors());

const { MongoClient } = require('mongodb');
var db = null;// global variable to hold the connection
const url = 'mongodb://127.0.0.1:27017/';

// var myUserName = "Ferran"

app.get('/api/data', async function(req, res) {

    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db('reelviewDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    const usersCollection = db.collection("users");
    const movieCollection = db.collection("movies");
    const users = await usersCollection.find({"name": "Nando"}).toArray();

    if (users.length > 0) {
        // Query to find all titles of movies
        const movies = await movieCollection.find({}).toArray();

        res.json(movies);
    } else {
        res.json({ message: "User not found" });
    }

})

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
