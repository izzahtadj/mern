const router = require('express').Router()
const Product = require('../models/product.model')

router.post('/api/addproduct', async (req, res) => {
    console.log(req.body)
    try {
        await Product.create({
            productname: req.body.productname,
            productcat: req.body.productcat,
            productsubcat: req.body.productsubcat,
            productprice: req.body.productprice,
            productqty: req.body.productqty,
            productdesc: req.body.productdesc,
        })
        res.json({ status: 'ok' })
    } catch (err){
        console.log(err)
        res.json({ status: 'error', error: err })
    }
})

module.exports = router