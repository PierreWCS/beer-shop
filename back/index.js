require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require('fs');

const api = require("./routes/");

//Create app

// Parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use API routes
app.use("/api", api);

// Get the uploads
app.get("/uploads", function(req, res) {
  const path = "../public/uploads/images/";

  fs.readdir(path, function(err, items) {
    if (err) {
      return res.status(500).json(err);
    }
    let correctFiles = items.filter(item => item.includes('.png') || item.includes('jpeg') || item.includes('jpg') );
    return res.status(200).send(correctFiles)
  });
});

// Upload a file
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../public/uploads/images/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).array("file");

app.post("/uploads", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }
    return res.status(200).send({
      message: "Your file has been successfully uploaded"
    });
    // Everything went fine.
  });
});

// Delete a file from the uploads
app.delete("/uploads/:imageName", function(req, res) {
  const file = `../public/uploads/images/${req.params.imageName}`;
  console.log(file);

  try {
    fs.unlinkSync(file);
    return res.status(200).send({
      message: "The file has been deleted"
    })
    //file removed
  } catch(err) {
    res.status(500).send(err);
  }
});


// Set port, listen for requests
app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is running on port ${process.env.PORT || 8000}.`)
);
