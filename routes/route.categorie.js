var express = require('express');
var router = express.Router();
const db = require("../models");
const Categorie = db.Categorie;
 
router.get('/', function(req, res, next) {
  Categorie.find().then(data => res.json(data));
});
// add product 
router.post('/',function(req,res,next)  {

const categorie = new Categorie({
  title:  req.body.title, 

})
categorie.save(categorie).then((data)=> res.json(data))
})
// remove product
router.delete('/:id',function(req,res,next)  {
const id = req.params.id; 
Categorie.findByIdAndRemove(id, (data)=> res.json("deleted successfully")) 
})

router.patch("/:id",function(req,res) {
  Categorie.findOne({_id : req.params.id},function(err,data){
    data.title = req.body.title ?? data.title;  
    data.save().then(data=> res.json(data))
  })
})
module.exports = router;