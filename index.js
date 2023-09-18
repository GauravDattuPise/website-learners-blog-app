
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

// seding request to user & blog & comment routes
const userRoute = require("./src/routes/userRoutes");
const blogRoute = require("./src/routes/blogRoutes");
const commentRoute = require("./src/routes/commentRoutes")

const app = express();
app.use(express.json());

// connecting node.js with mongodb
mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("db is connected")})
        .catch((err)=>{console.log(err.message)});

app.use("/user", userRoute);
app.use("/blogs", blogRoute);
app.use("/comment", commentRoute);

// running application on port
app.listen(process.env.PORT, function(){
    console.log("server is running on port ", process.env.PORT );
})
