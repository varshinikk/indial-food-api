import { getUser, signup, signin } from '../controllers/signupController'
var UsersController = require('../controllers/UsersController');
var AdminController = require('../controllers/AdminController');
const { check, validationResult } = require('express-validator/check')

const routes = (app) => {
  //signup
  app.route('/signup')
    .post(signup)
    .get(getUser)

  //signin
  app.route('/signin')
    .post(signin)

  //location
  app.post('/location', AdminController.location);
  app.get('/getbyLocId/:locationId1', AdminController.getRstByLocId);

  //restaurants
  app.post('/rst', AdminController.restaurants);
  app.get('/getbyRstId/:_id', AdminController.getRstID);

  //menu
  app.post('/addmenu', AdminController.addMenu);
  app.get('/getmenulist/:Rid', AdminController.getmenuDetails);

  //food
  app.post('/addfood', AdminController.addFood);
  app.get('/getfoodlist/:menuid', AdminController.getfoodDetails);

  //cart
  app.post('/addcart', UsersController.addToCart);
  app.get('/getcart', UsersController.getcart);
  app.put('/updateCart/:id', UsersController.updateCart);
  app.delete('/deletecart/:id', UsersController.deletecart);

}

export default routes;