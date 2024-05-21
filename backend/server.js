const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const productSchema = mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
    image:{
        type:String
    },
    author:{
        type:String
    },
    authorImage:{
        type:String
    },
    price:{
        type:Number
    }
})

const Products = mongoose.model("Products",productSchema)

app.get("/api/products", async (req,res)=>{
    const resp = await Products.find()
    res.send(resp)
})

app.post("/api/products", async (req,res)=>{
    const {title,desc,image,autor,autorImage,price} = req.body
    const newProduct = new Products({
        title:title,
        desc:desc,
        image:image,
        autor:autor,
        autorImage:autorImage,
        price:price
    })
    await newProduct.save()
    res.send("Item created")
})
app.put("/api/products/:id", async (req,res)=>{
    const {id} = req.params
    await Products.findByIdAndUpdate(id,{...req.body})
    res.send("Item Updated")
})

app.delete("/api/products/:id", async (req,res)=>{
    const {id} = req.params
    await Products.findByIdAndDelete(id)
    res.send("Item Deleted")
})

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(resp=>{console.log("DB CONNECTED");
}).catch(err=>{ console.log("db not connected");
})

app.listen(process.env.PORT, (res)=>{
    console.log("Port connected");
})