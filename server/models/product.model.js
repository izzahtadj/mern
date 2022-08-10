const mongoose = require('mongoose')


const AddProduct = new mongoose.Schema({
    productname: { type: String, required: true },
	productid: { type: String },
	productcat: { type: String, required: true },
	productsubcat: { type: String, required: true },
	productprice: { type:  Number, required: true },
	productqty: { type: Number, required: true },
	productdesc: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},

{collection: 'product-data'}

)

const productmodel = mongoose.model('AddProduct', AddProduct)

module.exports = productmodel