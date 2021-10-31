import express from "express";
import { MongoClient, ObjectId } from "mongodb";
export const router = express.Router();
const client = new MongoClient(
  "mongodb+srv://user:user@cluster0.gw7id.mongodb.net/haochen12?retryWrites=true&w=majority"
);
client
  .connect()
  .then(() => console.log("Connect to mongoDB"))
  .catch((error) => console.log(error));
// create character
/* router.post("/users", (req, res) => {
  const user: userSchema = req.body; //type of character
  client
    .db("haochen12")
    .collection("prueba")
    .insertOne(user)
    .then(() => {
      res.json(user);
    })
    .catch((e) => {
      console.log(e);
    })
    .then(() => console.log("insertado"));
}); */

//get all characters
router.post("/character", async (req, res) => {
  await client
    .db("haochen12")
    .collection("pruebafinal")
    .find()
    .toArray()
    .then((results) => {
      res.status(200).json({
        status: "200",  
        body: {
          results,
        },
      });
    })
    .catch((e) => {
      console.log(e);
    })
    .then(() => console.log("insertado"));
});

//get a character by id
router.post("/character/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await client
      .db("haochen12")
      .collection("pruebafinal")
      .find({ _id: new ObjectId(id) })
      .toArray()
      .then((results) => {
        res.json({
          results
        });
      })
      .then(() => console.log("encontrado"));
  } catch (e) {
    res.status(404).send({
      status: "404",
      Body: "Not Found",
    });
  }
});

//update character
router.put("/switchstatus/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    await client
      .db("haochen12")
      .collection("pruebafinal")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } })
      .then(() => {
        console.log("actualizado");
      });
    await client
      .db("haochen12")
      .collection("pruebafinal")
      .find({ _id: new ObjectId(id) })
      .toArray()
      .then((results) => {
        res.status(200).json({
          results,
        });
      });
  } catch (e) {
    res.status(404).send({
        status: "404",
        Body: "Not Found",
      });
  }
});

//delate character
router.delete("/character/:id", async (req, res) => {
    try{
  const id = req.params.id;
  await client
    .db("haochen12")
    .collection("pruebafinal")
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      res.status(200).json({
        Status: "200",
        Body: "OK",
      });
    })
    }catch(e){
      res.status(404).send({
        status: "404",
        Body: "Not Found",
      });
    };
});


