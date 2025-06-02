const Listing = require("../models/listing");

// Index Rout
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings}); 
}

// New rout

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}


// Show Rout

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",}}).populate("owner");
    if(!data){
        req.flash("error","The post that you are trying to find is doesn't exist");
        res.redirect("/listings");        
    }
    else{
        res.render("listings/show.ejs",{data});
    }
}


// Create (post Rout)

module.exports.createListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListings = new Listing(req.body.listings);
    newListings.owner = req.user._id;
    newListings.image = {url , filename};
    await newListings.save(); 
    req.flash("success","New Listing Created");
    res.redirect("/listings");
    }


// Edit rout

module.exports.renderEditForm = async (req,res)=>{
    let {id}  = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error","The post that you are trying to find is doesn't exist");
        res.redirect("/listings");        
    }
    let originalImageUrl = data.image.url;
    originalImageUrl = originalImageUrl.replace("/upload/h_300,w_250");

    res.render("listings/edit.ejs",{data,originalImageUrl});
}



// Update Post

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listings });
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }


    req.flash("success","Post Updated!");
    res.redirect(`/listings/${id}`);
}


// Delete Post

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let dltpost = await Listing.findByIdAndDelete(id);
    // console.log(dltpost);
    req.flash("success","Post Deleted!")
    res.redirect("/listings");
}