var router = require('express').Router()
var faker = require('faker')
var Product = require('../models/product')

router.get('/', (req, res, next) => {
  res.render('main/index')
}
)
router.get('/add-product', function (req, res, next) {
  res.render('main/add-product')
})

router.post('/add-product', async (req, res, next) => {
  const { categroy_name, product_name, product_price } = req.body;
  const cover = faker.image.image();
  const product = new Product({
    category: categroy_name,
    product: product_name,
    price: product_price,
    cover
  });
  try {
    await product.save();
    res.redirect('/add-product')
  } catch (err) {
    res.send(400, err)
  }

})
router.get('/generate-fake-data', function (req, res, next) {
  for (var i = 0; i < 90; i++) {
    var product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.cover = faker.image.image()

    product.save(function (err) {
      if (err) throw err
    })
  }
  res.redirect('/add-product')
})
router.get('/products/:page', function (req, res, next) {
  var perPage = 9
  var page = req.params.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      Product.count().exec(function (err, count) {
        if (err) return next(err)
        res.render('main/products', {
          products: products,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
})
module.exports = router;