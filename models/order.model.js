module.exports = mongoose => {
  var schemaOrder = mongoose.Schema(
    {
      name: String,
      lastname: String,
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      ccv: String,
      cc: String,
      address: String,
      wilayas: String,
      zip: String,
      nameCard: String,
      cardNum:  String
    },
    { timestamps: true }
  );
  const Order = mongoose.model("Order", schemaOrder);
  return Order;
};