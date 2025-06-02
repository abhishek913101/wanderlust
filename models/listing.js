const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title:{
        type:String,
        required:true,  
    },
    description:String,
    image:{
        filename:String,
        url:{
        type:String,
        default:
            "https://media.istockphoto.com/id/2164744129/photo/view-of-shikara-boats-and-houseboats-on-dal-lake-srinagar-jammu-and-kashmir-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=ShJ6qFb6jpS4LY02vNL7XnitnSyYmtH-bF6ALpk89-A=",
        set: (v) => 
            v === "" ? "https://media.istockphoto.com/id/2164744129/photo/view-of-shikara-boats-and-houseboats-on-dal-lake-srinagar-jammu-and-kashmir-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=ShJ6qFb6jpS4LY02vNL7XnitnSyYmtH-bF6ALpk89-A="
        : v,
        }
    },
    price:Number,
    location:String, 
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ], 
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});


listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;