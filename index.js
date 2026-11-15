import 'dotenv/config';
import express from 'express';
import cors from "cors"
import { MongoClient } from 'mongodb';




const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//mongodb

const client = new MongoClient(`mongodb://${process.env.BETTER_AUTH_MONGODB_USER}:${process.env.BETTER_AUTH_MONGODB_PASSWORD}@ac-ugwvkgh-shard-00-00.nxzamkn.mongodb.net:27017,ac-ugwvkgh-shard-00-01.nxzamkn.mongodb.net:27017,ac-ugwvkgh-shard-00-02.nxzamkn.mongodb.net:27017/?ssl=true&replicaSet=atlas-p2yio0-shard-0&authSource=admin`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}

const connectedClient = await connectToMongoDB()
const database = connectedClient.db("hireloopdb");
const users = database.collection("user");
const jobs = database.collection("jobs")




app.get('/', (req, res) => {
  res.send('hireloop is looping');
});

app.get('/users', async (req, res) => {
  const cursor = users.find({})
  const result = await cursor.toArray();
  res.send(result)
})



app.listen(port, () => {
  console.log(`Hire Loop is running on port ${port}`);
});


