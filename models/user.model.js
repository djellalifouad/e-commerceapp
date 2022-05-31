module.exports = mongoose => {
  var schemaUser = mongoose.Schema(
    {
      email: String,   
      nom: String,
      prenom: String,
      role:String,
      password: String 
    },
    { timestamps: true }
  );
  const User = mongoose.model("User", schemaUser);
  return User;
};