import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import placesRoutes from "./routes/places-routes.js";
import userRoutes from "./routes/users-routes.js";
import dotenv from 'dotenv';
import fs from "fs";
const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));
app.use(express.static(path.join('public')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);


app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname,'public','index.html'));
});

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


//place the method
mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9xmkp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
  app.listen(5000);
}).catch(err=>{
  console.log(err);
});
