import express from "express";
const app = express();
const port = 3001;

app.get("/api", (_, response) => {
  console.log("got request");
  response.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
