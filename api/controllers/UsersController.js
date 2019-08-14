const cartmodel = require('../models/Cart');

exports.addToCart = (req, res, next) => {
  console.log("jjii")
  const cart = new cartmodel({
    food_name: req.body.food_name,
    price: req.body.price,
    quantity: req.body.quantity,
    total_price: req.body.total_price
  })
  return cart.save()
    .then(results => {
      // console.log(result);
      res.status(200).json({
        message: "food is added to the cart",
        cartId: results._id
      })
    })
}

exports.getcart = (req, res) => {
  cartmodel.find(function (err, data) {
    if (err)
      res.send(err);
    res.send(data);
    console.log("hi")
  })
}

exports.deletecart = (req, res) => {
  console.log(req)
  cartmodel.remove({ _id: req.params.id }, (error, data) => {
    if (error) { res.json(error) }
    res.json(data)
  })
}
// update the cart
exports.updateCart = (req, res) => {
  console.log("update cart")
  cartmodel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, data) => {
    if (error) { res.json(error) }
    res.json(data)
  })
}