const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const { ObjectId } = require('mongodb');

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db('chillGamerDB'); 
        const gamesCollection = database.collection('games'); 
        const userCollection = client.db('chillGamerDB').collection('users');
        const reviewCollection = client.db('chillGamerDB').collection('reviews');

        


        app.post('/users',async(req,res)=>{
            const newUser = req.body;
            console.log('creating new user',newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        app.post('/review',async(req,res)=>{
            const newReview = req.body;
            console.log(newReview);
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
           
        })

        app.get('/review', async (req, res) => {
            try {
                const reviews = await reviewCollection.find().toArray(); 
                res.send(reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                res.status(500).json({ message: 'Failed to fetch reviews' });
            }
        });

        app.get('/reviews/:id', async (req, res) => {
           const id = req.params.id;
           try {
           const review = await reviewCollection.findOne({ _id: new ObjectId(id) }); 
           if (review) {
            res.send(review); 
           } else {
            res.status(404).json({ message: 'Review not found' }); 
           }
           } catch (error) {
           console.error('Error fetching review by ID:', error);
           res.status(500).json({ message: 'Failed to fetch review' }); 
           }
        });
        app.get('/highest-rated-games', async (req, res) => {
            try {
                const games = await gamesCollection
                    .find()
                    .sort({ rating: -1 }) 
                    .limit(6) 
                    .toArray();

                res.json(games); 
            } catch (error) {
                console.error('Error fetching games:', error);
                res.status(500).json({ message: 'Failed to fetch games' });
            }
        });

        app.get('/highest-rated-games/:id', async (req, res) => {
            const id = req.params.id;
            try {
            const details = await gamesCollection.findOne({ _id: new ObjectId(id) }); 
            if (details) {
             res.send(details); 
            } else {
             res.status(404).json({ message: 'Details not found' }); 
            }
            } catch (error) {
            console.error('Error fetching review by ID:', error);
            res.status(500).json({ message: 'Failed to fetch details' }); 
            }
         });

        


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
run().catch(console.error);

    




app.get('/',(req,res) =>{
    res.send('chill gamer is running');
})

app.listen(port,()=>{
    console.log(`Chill gamer server is running on port:${port}`)
})