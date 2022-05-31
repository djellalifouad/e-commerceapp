var express = require('express');
var router = express.Router();
const db = require("../models");
const Product = db.Product;
router.get('/', function(req, res, next) {
  console.log(req.params.category)
   console.log(req.query.category);
   if(!req.query.category) {
  Product.find({
  })
    .populate({
      path: "categorie",
    })
    .then((data) => res.json(data));
   }
   
   else {
 Product.find({
   categorie: req.query.category ?? "",
   $or: [
     { nom: { $regex: ".*" + req.query.search ?? "" + ".*" } },
     { desc: { $regex: ".*" + req.query.search ?? "" + ".*" } },
   ],
 })
   .populate({
     path: "categorie",
   })
   .then((data) => res.json(data));
   }
});
// add product 
router.post('/',function(req,res,next)  {
        const image = '/Upload/' + Date.now().toString().trim()  + "."+ req.files.image.mimetype.split('/')[1]
           req.files.image.mv(
          '.' + image
        )
const product = new Product({
  nom:  req.body.nom, 
  image :'http://localhost:3003' + image, 
  desc : req.body.desc, 
  qty : req.body.qty,
  ram : req.body.ram, 
  memory: req.body.memory, 
  screenType : req.body.screenType, 
  processor : req.body.processor, 
  categorie : req.body.categorie,
  price : req.body.price,
})
console.log(req.body.categorie);
product.save(product).then((data)=> res.json(data))
})
router.get('/:id',function(req,res,next){
    Product.findOne({
     _id: req.params.id,
    }).populate('categorie').then((data)=> res.json(data));
})
// remove product
router.delete('/:id',function(req,res,next)  {
const id = req.params.id; 
Product.findByIdAndRemove(id, (data)=> res.json("deleted successfully")) 
})
router.patch("/:id",function(req,res) {
  Product.findOne({_id : req.params.id},function(err,data){
    data.nom = req.body.nom ?? data.nom ;  
    data.categorie = req.body.categorie ?? data.categorie ; 
    data.qty = req.body.qty ?? data.qty ;
    data.desc = req.body.desc ?? data.desc ;
    data.ram = req.body.ram ?? data.ram ;
    data.memory = req.body.memory ?? data.memory ;
    data.screenType  = req.body.screenType ?? data.screenType ;
    data.processor = req.body.processor ?? data.processor;
    data.price = req.body.price ?? data.processor;
    data.save().then(data=> res.json(data))
  })
})
module.exports = router;