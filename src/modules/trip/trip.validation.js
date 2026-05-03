const Joi = require('joi');

const CAR_TYPES = ['car', 'motorcycle', 'tukutuk', 'altTukutuk'];

const locationSchema = Joi.object({
  lat:     Joi.number().min(-90).max(90).required(),
  lng:     Joi.number().min(-180).max(180).required(),
  address: Joi.string().optional().allow(''),
});

const searchTripSchema = Joi.object({
  startLocation: locationSchema.required(),
  carType:       Joi.string().valid(...CAR_TYPES).required(),
});

const createTripSchema = Joi.object({
  captainId:     Joi.string().hex().length(24).required(),
  carType:       Joi.string().valid(...CAR_TYPES).optional(),
  startLocation: locationSchema.required(),
});

const endTripSchema = Joi.object({
  distanceKm: Joi.number().min(0).required(),
});

const cancelTripSchema = Joi.object({
  reason: Joi.string().max(300).optional().allow('', null),
});

const estimateFareSchema = Joi.object({
  startLocation: locationSchema.required(),
  endLocation:   locationSchema.required(),
  carType:       Joi.string().valid(...CAR_TYPES).required(),
});

module.exports = { searchTripSchema, createTripSchema, endTripSchema, cancelTripSchema, estimateFareSchema };
