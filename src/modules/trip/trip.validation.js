const Joi = require('joi');

const createTripSchema = Joi.object({
  captainId: Joi.string().hex().length(24).required(),
  startLocation: Joi.object({
    lat:     Joi.number().min(-90).max(90).required(),
    lng:     Joi.number().min(-180).max(180).required(),
    address: Joi.string().optional(),
  }).required(),
});

const endTripSchema = Joi.object({
  distanceKm: Joi.number().min(0).required(),
});

const cancelTripSchema = Joi.object({
  reason: Joi.string().max(300).optional().allow('', null),
});

module.exports = { createTripSchema, endTripSchema, cancelTripSchema };
