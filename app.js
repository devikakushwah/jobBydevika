const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin.route');
const categoryRouter = require('./routes/category.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const app = express();
mongoose.connect("mongodb+srv://devikakushwah:Radhakrishna%4029@newcluster.7o13k.mongodb.net/jobBydevika");

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/category",categoryRouter);
const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("server running....");
});