const express =require("express");
const bodyParser =require("body-parser");
const mongoose =require("mongoose");
const shortId =require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/shopping-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "PRODUCT",
  new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: { type: String },
    image: { type: String },
    price: { type: Number },
    description: { type: String },
    availableSizes: { type: [String] },
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    if(!Product){
      res.status(404).send("product is not found")
    }else{
      const productDeleted = await Product.findByIdAndDelete(req.params.id);
      res.status(200).send("product is Deleted");
    }
  } catch (error) {
    console.error(error.message);
  }

 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is raunnig in PORT " + PORT));
