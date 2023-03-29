const path = require('path');
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');

var PriceFeed = require('../model/priceFeedsSchema');


var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    console.log('destination--------');
    callBack(null, '../router/uploads/');
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

const uploadCsv = (uriFile,res,next) => {
    console.log("uriFile",uriFile);
    try{

      let readStream = fs.createReadStream(uriFile);
      let csvDataColl = [];

      let fileStream = csv
        .parse({ headers: true })
        .on('data', (data) => {
          console.log("data received....");
          csvDataColl.push(
            new PriceFeed({
              storeId: data.STORE_ID,
              sku: data.SKU,
              productName: data.PRODUCT_NAME,
              price: data.PRICE,
              date: data.DATE,
            })
          );
        })
        .on('end', () => {
          insertData(res, csvDataColl,next);
          fs.unlinkSync(uriFile);
        })
        .on('error', (err) => {
          console.error("err",err);
          next(err);
        });
        readStream.pipe(fileStream);
    }catch(ex){
      console.log("Exception in read stream",ex);
      next(ex);
    }
};

const insertData = async (res, csvDataColl,next) => {
  try {
    const options = { ordered: false };
    let priceFeeds = await PriceFeed.create(csvDataColl, options);
    console.log(`${priceFeeds.length} documents were inserted`);
    res.status(200).send({ status: 200, message: 'File has imported' });
    console.log('File has imported');
  } catch (ex) {
    console.log("exception during insert");
    next(ex);
  }
};

const uploadHandler = async (req, res, next) => {
  try {
    console.log("uploadHandler....");
    if (!req.file) {
        console.log("no file uploadHandler....");
        next(new Error("No Files found"));
    } else {
      uploadCsv(
        __dirname +
          '/uploads/' +
          req.file.fieldname +
          path.extname(req.file.originalname),
        res,
        next
      );
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  uploadHandler,
  uploader,
};
