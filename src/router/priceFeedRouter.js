var express = require('express');
var router = express.Router();
const path = require('path');
var priceFeedController = require("../controller/priceFeed");
var uploadCSVController = require("../controller/csvUploader");


/* multer Middeware */
const multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    console.log('destination--------');
    callBack(null, './controller/uploads/');
  },
  filename: (req, file, callBack) => {
    console.log(
      'filename------',
      file.fieldname + path.extname(file.originalname)
    );
    callBack(null, file.fieldname + path.extname(file.originalname));
  },
});

var uploader = multer({
  storage: storage,
});

/* multer Middeware */



// read operation
router.get('/getAllPriceFeeds', priceFeedController.getAllPriceFeeds);
router.post('/getPriceFeedByCriteria', priceFeedController.getPriceFeedByCriteria);

//write 
router.post('/importcsv', uploader.single('importcsv'), uploadCSVController.uploadHandler);
router.put('/updatePriceFeed', priceFeedController.updatePriceFeed);

module.exports = router;
