module.exports = mongoose => {
  var schemaProduct = mongoose.Schema(
    {
      qty: String,
      nom: String,
      categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
      },
      image: String,
      desc: String,
      price: String,
      memory: String,
      processor :  String, 
      screenType : String, 
      ram : String,
    },

    { timestamps: true }
  );
  const Product = mongoose.model("Product", schemaProduct);
  return Product;
};