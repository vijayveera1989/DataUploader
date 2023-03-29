const joi = require('@hapi/joi');


var priceSchema = joi.object({
    storeId: joi.number().required(),
    sku:  joi.number().required(),
    productName:  joi.string().required(),
    price:  joi.string().number().required(),
    date: joi.date().required(),
})

function validatePriceFeed(body) {
    return priceSchema.validateAsync(body)
}
  
  module.exports = priceSchema;