var express = require("express");
var router = express.Router();
const db = require("../models");
const Order = db.Order;
router.post('/',(req,res)=> {
    console.log("dkhalna")
    const order = new Order({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      cvv: req.body.cvv,
      cc: req.body.cc,
      address: req.body.address,
      wilayas: req.body.wilayas,
      zip: req.body.zip,
      nameCard: req.body.nameCard,
      cardNum: req.body.cardNum,
      product_id : req.body.product_id, 
    });
    order.save(order).then(data=> res.json(data))
})
router.get("/", (req, res) => {
  console.log("dkhalna");
Order.find()
  .populate({
    path: "product_id",
  })
  .then((data) => res.json(data));
});
module.exports = router;