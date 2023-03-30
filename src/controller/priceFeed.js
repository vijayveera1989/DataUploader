var PriceFeed = require('../model/priceFeedsSchema');

const getAllPriceFeeds = async (req, res, next) => {
  console.log('getAllPriceFeeds called');
  console.log(req.query);
  try {
  
    
     //let priceFeeds = await PriceFeed.find({}).limit(100).skip().exec();
    // get total documents in the Posts collection
   // let count = await PriceFeed.count();
    //console.log(count);
    const { limit = 0, skip = 0 } = req.query;
	
	if(limit>100){ // validate and overwrite the limit if it is beyond the threshold in server side 
		limit = 100;
	}
    const facetedPipeline = [
      {
        "$facet": {
          "data": [
            { "$skip": Number(skip) },
            { "$limit": Number(limit) }
          ],
          "totalCount": [
            { "$count": "total" }
          ]
        }
      }
    ];
    const results = await PriceFeed.aggregate(facetedPipeline);
    console.log(JSON.stringify(results));

    res
      .status(200)
      .send({ status: 200, priceFeeds: results[0].data, totalCount: results[0].totalCount[0].total});
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

const getPriceFeedByCriteria = async (req, res, next) => {
  console.log('getPriceFeedByCriteria called');
  try {
    const { filterOptions } = req.body;
    console.log('filterOptions', filterOptions);
    let priceFeeds = await PriceFeed.find(filterOptions);
    console.log(`${priceFeeds.length} documents found`);
    res.status(200).send({ status: 200, priceFeeds: priceFeeds });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

const updatePriceFeed = async (req, res, next) => {
  console.log('updatePriceFeed called');
  try {
    const { updateRecord } = req.body;
    let priceFeeds = await PriceFeed.updateOne(
      { _id: updateRecord._id },
      updateRecord
    );
    console.log(`${priceFeeds} document updated`);
    res.status(200).send({ status: 200, priceFeeds: priceFeeds });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

module.exports = {
  getAllPriceFeeds,
  getPriceFeedByCriteria,
  updatePriceFeed,
};
