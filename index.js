import express from "express";
import fs from "fs";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server Created");
});
app.get("/createfile", (req, res) => {
  let date = new Date();
  date = date.toUTCString().replace(/\:/g, ".");
  console.log(date);
  fs.writeFile(`files/${date}.txt`, date, (err) => {
    console.log("File created successfully");
  });
  res.send({msg:"File created successfully"});
});

app.get("/readfile", (req, res) => {
  fs.readdir("files", (err, date) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      console.log(date)
      return res.send(date);
    }
  });
});
app.listen(PORT, console.log("Server started in:" + PORT));

