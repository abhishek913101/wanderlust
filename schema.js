const Joi = require("joi");
// const joy = require("joi");

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),  
        description:Joi.string().required(),
        country:Joi.number().required(),
        price:Joi.number().required().min(0),
        image:Joi.object({
            filename: Joi.string().required(),
            url:Joi.string().allow("",null),
        }).required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
});