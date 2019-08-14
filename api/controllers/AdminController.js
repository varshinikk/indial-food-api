const locationModel = require('../models/Location');
const restaurantsModel = require('../models/Restaurant');
const menuModel = require('../models/Menu');
const foodModel = require('../models/Food');

exports.location = (req, res, next) => {
  const loc = new locationModel({
    locationName: req.body.locationName,
    isAdmin: req.body.isAdmin
  })
  return loc.save()
    .then(result => {
      res.status(200).json({
        message: "location created",
        location_id: result._id

      })
    })
}
exports.restaurants = (req, res, next) => {
  const Rst = new restaurantsModel({
    locationId: req.body.locationId,
    RName: req.body.RName,
    DeliveryCharge: req.body.DeliveryCharge
  })
  return Rst.save()
    .then(result => {
      res.status(200).json({
        message: "restaurants created",
        restaurant_id: result._id
      })
    })
}
exports.getRstByLocId = (req, res, next) => {
  debugger;
  restaurantsModel.find({ locationId: { $in: req.params.locationId1 } })
    .then(result => {
      res.status(200).json({
        message: 'given location restaurants',
        result: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

// get by restaurants based on restaurants id
exports.getRstID = (req, res, next) => {
  debugger;
  restaurantsModel.findById({ _id: req.params._id })
    .then(result => {
      res.status(200).json({
        message: 'restaurants details based on restaurants id',
        result: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.addMenu = (req, res, next) => {
  const menu = new menuModel({
    RstId: req.body.RstId,
    menuName: req.body.menuName
  })
  return menu.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "menu created",
        menu_id: result._id
      })
    })
}

//   getall menu list based on restID
exports.getmenuDetails = (req, res, next) => {
  menuModel.find({ RstId: { $in: req.params.Rid } })
    .then(result => {
      res.status(200).json({
        message: 'list of menus based on restaurant id',
        result: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
// add food based on menuId
exports.addFood = (req, res, next) => {
  const food = new foodModel({
    menuId: req.body.menuId,
    foodName: req.body.foodName,
    cost: req.body.cost
  })
  return food.save()
    .then(result => {
      res.status(200).json({
        message: "foods are added",
        food_id: result._id
      })
    })
}
//   food list based on menuid
exports.getfoodDetails = (req, res, next) => {
  foodModel.find({ menuId: { $in: req.params.menuid } })
    .then(result => {
      res.status(200).json({
        message: 'list of food based on menuid',
        result: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}