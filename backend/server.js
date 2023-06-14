const express = require('express');
const app = express();
const cors = require("cors");
const port = 5000
const connectDatabase = require("./mongodb/connectiondb")
const Product = require("./mongodb/productSchema");
const bodyParser = require('body-parser')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200)
        .json({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
});
app.post('/addproduct', async(req, res) =>{
    const product = await Product.create({
        ...req.body
    })
    console.log(req.body)
    return res.status(200)
    .json({
        success: true,
        data: product, 
    })
});
app.put('/editproduct/:_id', async(req, res) =>{
    
    const { _id } = req.params
    const {title, price, specification, detail, image} = req.body
    let product = await Product.findById(_id)
    
    product.title = title;
    product.price = price;
    product.specification = specification;
    product.detail = detail;
    product.image = image;

    product = await product.save();

    return res.status(200)
    .json({
        success: true,
        data: product, 
    })
});
app.delete('/delete/:_id', async(req,res)=>{
    const {_id} = req.params;
    let product = await Product.findByIdAndDelete(_id);

    res.status(200)
    .json({
        success: true,
    })
})


connectDatabase()

app.listen(port, () => console.log(`Server has started on port: ${port}`))