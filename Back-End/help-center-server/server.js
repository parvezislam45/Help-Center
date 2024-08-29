const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 7000;



// --------MiddleWire------------

app.use(cors());
app.use(express.json());


// ------------------------- MongoDB Database Connection ------------------------------------

const uri = "mongodb+srv://parvezdavid4:ws8w9t3N5dQroBDU@help-center.wij2i.mongodb.net/?retryWrites=true&w=majority&appName=help-center"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
    await client.connect();
    const dataCollection = client.db("dataCollection").collection("data");


    // ----------------------------- Get All Data ----------------------------------


    app.get("/card", async (req, res) => {
        const query = {};
        const cursor = dataCollection.find(query);
        const data = await cursor.toArray();
        res.send(data);
      });


    //   ----------------- Post Data --------------------------

      app.post('/card', async (req, res) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).send({ error: "Title and description are required." });
            }
    
            const newData = { title, description };
            const result = await dataCollection.insertOne(newData);
            res.send(result);
        } catch (error) {
            console.error("Error inserting data:", error);
            res.status(500).send({ error: "An error occurred while saving the data." });
        }
    });


    // ------------------------------------- Get Data by Title--------------------------------------

    app.get('/card/:keyword', async (req, res) => {
        try {
            const keyword = req.params.keyword.toLowerCase();
            const results = await dataCollection.find().toArray();
            const filteredResults = results.filter(data => 
                data.title && data.title.toLowerCase().includes(keyword)
            );
    
            if (filteredResults.length === 0) {
                return res.status(404).send({ error: "No data found matching the provided keyword." });
            }
            res.send(filteredResults);
        } catch (error) {
            console.error("Error finding data:", error);
            res.status(500).send({ error: "An error occurred while retrieving the data." });
        }
    });
    
    
    
    }
    finally{}
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" server is Running");
});
app.listen(port, () => {
  console.log("Help-Center server is Start");
});