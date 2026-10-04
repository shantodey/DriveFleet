const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express');
const dotenv = require('dotenv')
const cors = require("cors");


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
dotenv.config()
const uri = process.env.MONGODB_URI

const app = express()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send("server is runnig fine")
})


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// verify token for user data 
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)
const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ massage: " Unauthorized" })
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ massage: " Unauthorized" })
  }
  try {
    const { payload } = await jwtVerify(token, JWKS)
    console.log(payload);
    next()
  } catch {
    return res.status(403).json({ massage: " Forbidden" })
  }


}

async function run() {
  try {
    // await client.connect();
    // creating a Database to stor the data 
    const db = client.db("DriveFleet")


    // Making different collections on the database to store different data
    const addCarCollection = db.collection("cars")
    const bookingCars = db.collection("bookcar")


    // sending add card data to database
    app.post('/cars', async (req, res) => {
      const cars = req.body;
      const result = await addCarCollection.insertOne(cars)
      res.json(result)
    })

    // Getting car data for Explore Cars page from databse
    app.get('/cars', async (req, res) => {
      const { q, t } = req.query;
      let filter = {};
      if (q) {
        filter.carName = {
          $regex: q,
          $options: 'i'
        };
      }

      if (t) {
        filter.carType = {
          $regex: t,
          $options: 'i'
        };
      }
      try {
        const result = await addCarCollection.find(filter).toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error });
      }
    });


    // 

    // Getting Individual card data 
    app.get('/cars/:id', verifyToken, async (req, res, next) => {
      const { id } = req.params;
      const result = await addCarCollection.findOne({ _id: new ObjectId(id) })
      res.json(result)
    });


    // adding Booking Cars data to database
    app.post('/booking', async (req, res) => {
      const bookscar = req.body;
      const result = await bookingCars.insertOne(bookscar)
      res.json(result)
      console.log(result);

    })


    // getting Booking card data form database who is booking
    app.get('/booking/:userId', async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCars.find({ userId: userId }).toArray();
      res.json(result)
    })


    // api for delete booking card that user has added in data base
    app.delete('/booking/:id', async (req, res) => {
      const { id } = req.params;
      const result = await bookingCars.deleteOne({ _id: new ObjectId(id) })
      res.json(result)
    })



    app.get('/my-added-cars/:ownerId', async (req, res) => {
      const { ownerId } = req.params;
      try {
        const query = { ownerId: ownerId };
        const result = await addCarCollection.find(query).toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error fetching your cars", error });
      }
    });


    // Editing individual car data who have added a new car 
    app.patch('/my-added-cars/:id', async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;

      const result = await addCarCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      res.json(result);
    });




    // Delete individual car
    app.delete('/my-added-cars/:id', async (req, res) => {
      const { id } = req.params;

      try {
        const result = await addCarCollection.deleteOne({
          _id: new ObjectId(id)
        });

        res.json(result);

      } catch (error) {
        res.status(500).json({
          message: "Failed to delete car",
          error
        });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`server is running on port${PORT}`);

})