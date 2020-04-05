require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const api = require("./routes/");

//Create app

// Parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use API routes
app.use("/api", api);

// Set port, listen for requests
app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is running on port ${process.env.PORT || 8000}.`)
);
