module.exports = mongoose => {
  var schemaCategorie = mongoose.Schema(
    {
      title: String,  
    },
    { timestamps: true }
  );
  const Categorie = mongoose.model("Categorie", schemaCategorie);
  return Categorie;
};