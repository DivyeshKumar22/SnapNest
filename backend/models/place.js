import mongoose from "mongoose";
//MYSQL table to schema
const Schema=mongoose.Schema;
const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    creator: { type: mongoose.Types.ObjectId, required: true,ref:'User' }
  });
  
// model return constructor Place is collection
export default mongoose.model('Place',placeSchema);