const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js")
const {listingSchema,reviewSchema} = require("../schema.js");
const methodOverride = require("method-override");
const {isLoggedIn, isOwner,validateListings} = require("../middleware.js")
const listingController = require("../controllers/listings.js");
// Multer
const multer  = require('multer');
const  {storage} = require("../cloudConfig.js");
const upload = multer({ storage });




// Index Rout
router.get("/", wrapAsync(listingController.index));

//New Routs
router.get("/new", isLoggedIn, listingController.renderNewForm)

// Show rout
router.get("/:id", wrapAsync(listingController.showListing))


// Post (Create Rout)
router.post("/", isLoggedIn,  upload.single('listings[image][url]'),wrapAsync(listingController.createListing));

// router.post("/", upload.single('listings[image][url]'),(req,res)=>{
//     res.send(req.file);
// })


// Edit
router.get("/:id/edit", isLoggedIn,wrapAsync(listingController.renderEditForm));

// Update
router.put("/:id", isLoggedIn, isOwner, upload.single('listings[image][url]'),wrapAsync(listingController.updateListing));

// Delete Post
router.delete("/:id", isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;