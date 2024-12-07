const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware

app.use(cors());
app.use(express.json());

// user: chillGamer
// pass: Kyb1x2seZt8UNED7

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


const uri = "mongodb+srv://chillGamer:Kyb1x2seZt8UNED7@cluster0.lwvml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
        try {
            await client.connect();
            console.log('Connected to MongoDB!');
        
            const database = client.db('chillGamerDB');
            const collection = database.collection('games');
        
            // Data to insert
            const data = [
              { "image": "https://i.ibb.co/L9fs23h/galaxys-edge.jpg", "title": "Galaxy's Edge", "rating": 4.9 },
              { "image": "https://i.ibb.co/10BVwN5/infernal-3.jpg", "title": "Infernal 3", "rating": 4.8 },
              { "image": "https://i.ibb.co/BfZ6cYZ/legacy-of-heroes.jpg", "title": "Legacy of Heroes", "rating": 4.7 },
              { "image": "https://i.ibb.co/pntXjYB/mythos-reborn.jpg", "title": "Mythos Reborn", "rating": 4.6 },
              { "image": "https://i.ibb.co/jZJJPLM/crystal-dawn.jpg", "title": "Crystal Dawn", "rating": 4.5 },
              { "image": "https://i.ibb.co/H4m4QFG/titans-forge.jpg", "title": "Titan's Forge", "rating": 4.4 }
            ];

            const deleteResult = await collection.deleteMany({});
    console.log(`${deleteResult.deletedCount} documents deleted.`);

 
    const insertResult = await collection.insertMany(data);
    console.log(`${insertResult.insertedCount} documents inserted successfully.`);


    const insertedData = await collection.find().toArray();
    console.log('Inserted Data:', insertedData);

  } catch (error) {
    console.error('Error during database operations:', error);
  } finally {
    await client.close();
    // console.log('MongoDB connection closed.');
  }
}

run().catch(console.dir);




app.get('/',(req,res) =>{
    res.send('chill gamer is running');
})

app.listen(port,()=>{
    console.log(`Chill gamer server is running on port:${port}`)
})