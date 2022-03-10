const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
// const path = require("path");
// const notes = require('./data/notes');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);


// ----------------------- Code for deployment ------------------------------------

// __dirname = path.resolve();

// if (process.env.NODE_ENV === 'production') {

//     app.use(express.static(path.join(__dirname,"/frontend/build")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend" , "build" , "index.html"));
//     });

// }else{
//     app.get("/", (req, res) => {
//         res.send("API is running");
//     });
// }


// ----------------------- Code for deployment ------------------------------------



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));