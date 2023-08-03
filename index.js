const express = require("express");

const cors = require("cors");
const DB = require("./dbconnector/connectDB");
const TODOSCHEMA = require("./models/todoschema");

require("dotenv").config();
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

//getting data from database
app.get("/todos", async (req, res) => {
  try {
    const todos = await TODOSCHEMA.find({}).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

//posting and saving data in database
app.post("/todo/new", (req, res) => {
  const newtodo = new TODOSCHEMA({
    newTodo: req.body.newTodo,
  });
  newtodo.save();
  res.json(newtodo);
});

//deleting tasks
app.delete("/todo/delete/:id", async (req, res) => {
  const deltodo = await TODOSCHEMA.findByIdAndDelete(req.params.id);
  res.json(deltodo);
});

//after marking as complete check/uncheck tasks

app.get("/todo/complete/:id/:type", async (req, res) => {
  const todo = await TODOSCHEMA.findByIdAndUpdate(req.params.id, {
    complete: req.params.type,
  });

  res.json(todo);
});

//declaring port number
const port = process.env.PORT || 8000;
//for database connection
DB();

//for hosting the website on live server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/client/build/index.html"),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}

//for creating server
app.listen(port, () => console.log(`server is running at ${port}`));
