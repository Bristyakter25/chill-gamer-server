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
              { 
                  "image": "https://i.ibb.co/L9fs23h/galaxys-edge.jpg", 
                  "title": "Galaxy's Edge", 
                  "rating": 4.9, 
                  "description": "Embark on an intergalactic journey filled with breathtaking visuals and challenging gameplay. Explore alien worlds and uncover hidden secrets in this sci-fi masterpiece.",
                  "genre": "Sci-Fi Adventure",
                  "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
                  "releaseDate": "2024-03-15",
                  "developer": "Cosmic Studios"
              },
              { 
                  "image": "https://i.ibb.co/10BVwN5/infernal-3.jpg", 
                  "title": "Infernal 3", 
                  "rating": 4.8, 
                  "description": "Dive into the fiery underworld in the thrilling third installment of the Infernal series. Battle powerful demons and uncover the mysteries of the abyss.",
                  "genre": "Action RPG",
                  "platforms": ["PC", "PlayStation 4", "Xbox One"],
                  "releaseDate": "2023-10-12",
                  "developer": "Inferno Games"
              },
              { 
                  "image": "https://i.ibb.co/BfZ6cYZ/legacy-of-heroes.jpg", 
                  "title": "Legacy of Heroes", 
                  "rating": 4.7, 
                  "description": "Assemble your team of legendary heroes and embark on an epic quest to save the kingdom. A perfect blend of strategy and action for fantasy lovers.",
                  "genre": "Fantasy Strategy",
                  "platforms": ["PC", "Nintendo Switch"],
                  "releaseDate": "2023-08-22",
                  "developer": "Epic Realms"
              },
              { 
                  "image": "https://i.ibb.co/pntXjYB/mythos-reborn.jpg", 
                  "title": "Mythos Reborn", 
                  "rating": 4.6, 
                  "description": "Immerse yourself in a world where ancient myths come to life. Solve puzzles, battle mythological beasts, and rewrite history in this captivating RPG.",
                  "genre": "Mythological RPG",
                  "platforms": ["PC", "PlayStation 5"],
                  "releaseDate": "2024-01-10",
                  "developer": "Mythical Creations"
              },
              { 
                  "image": "https://i.ibb.co/jZJJPLM/crystal-dawn.jpg", 
                  "title": "Crystal Dawn", 
                  "rating": 4.5, 
                  "description": "Uncover the secrets of a forgotten civilization in Crystal Dawn. A stunning adventure game featuring breathtaking landscapes and a gripping storyline.",
                  "genre": "Adventure Puzzle",
                  "platforms": ["PC", "Xbox Series X"],
                  "releaseDate": "2023-06-18",
                  "developer": "Dawnlight Studios"
              },
              { 
                  "image": "https://i.ibb.co/H4m4QFG/titans-forge.jpg", 
                  "title": "Titan's Forge", 
                  "rating": 4.4, 
                  "description": "Step into the shoes of a blacksmith crafting legendary weapons to face colossal titans. An action-packed game with intense battles and creative mechanics.",
                  "genre": "Action Adventure",
                  "platforms": ["PC", "PlayStation 4", "Nintendo Switch"],
                  "releaseDate": "2022-12-01",
                  "developer": "Forge Masters"
              },
              
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