// src/modules/fare/fare.controller.js

const Fare = require('./fare.model');
const { sendSuccess, sendError } = require('../../utils/response.util');

// Get all active fares
const getFares = async (req, res, next) => {
  try {
    const { includeInactive = false, showInAppOnly = true } = req.query;
    
    let filter = {};
    
    // Filter by isActive
    if (includeInactive !== 'true') {
      filter.isActive = true;
    }
    
    // Filter by showInApp (for frontend display)
    if (showInAppOnly === 'true') {
      filter.showInApp = true;
    }
    
    const fares = await Fare.find(filter)
      .sort({ displayOrder: 1, vehicleType: 1 });
    
    // Transform to object format expected by frontend
    const faresMap = {};
    fares.forEach(fare => {
      faresMap[fare.vehicleType] = {
        baseFare: fare.baseFare,
        perKmFare: fare.perKmFare,
        firstKmFare: fare.firstKmFare,
        extraKmFare: fare.extraKmFare,
        currency: fare.currency,
        description: fare.description,
        commissionPercentage: fare.commissionPercentage,
        minFare: fare.minFare,
        waitingChargePerMinute: fare.waitingChargePerMinute,
        isActive: fare.isActive,
        showInApp: fare.showInApp,
        displayOrder: fare.displayOrder,
      };
    });
    
    sendSuccess(res, faresMap, 'Fares retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Get single fare by vehicle type
const getFareByType = async (req, res, next) => {
  try {
    const { vehicleType } = req.params;
    const fare = await Fare.findOne({ vehicleType });
    
    if (!fare) {
      return sendError(res, 'Fare configuration not found', 404);
    }
    
    sendSuccess(res, fare, 'Fare retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Create or update fare (Admin only)
const upsertFare = async (req, res, next) => {
  try {
    const { vehicleType } = req.params;
    const updateData = req.body;
    
    const fare = await Fare.findOneAndUpdate(
      { vehicleType },
      { 
        ...updateData, 
        vehicleType,
        // Ensure isActive is handled properly
        isActive: updateData.isActive !== undefined ? updateData.isActive : true,
      },
      { new: true, upsert: true, runValidators: true }
    );
    
    sendSuccess(res, fare, 'Fare saved successfully');
  } catch (error) {
    next(error);
  }
};

// Toggle fare active status (Admin only)
const toggleFareStatus = async (req, res, next) => {
  try {
    const { vehicleType } = req.params;
    const { isActive } = req.body;
    
    if (isActive === undefined) {
      return sendError(res, 'isActive field is required', 400);
    }
    
    const fare = await Fare.findOneAndUpdate(
      { vehicleType },
      { isActive },
      { new: true }
    );
    
    if (!fare) {
      return sendError(res, 'Fare configuration not found', 404);
    }
    
    sendSuccess(res, fare, `Fare ${isActive ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    next(error);
  }
};

// Toggle showInApp status (Admin only)
const toggleShowInApp = async (req, res, next) => {
  try {
    const { vehicleType } = req.params;
    const { showInApp } = req.body;
    
    if (showInApp === undefined) {
      return sendError(res, 'showInApp field is required', 400);
    }
    
    const fare = await Fare.findOneAndUpdate(
      { vehicleType },
      { showInApp },
      { new: true }
    );
    
    if (!fare) {
      return sendError(res, 'Fare configuration not found', 404);
    }
    
    sendSuccess(res, fare, `Fare ${showInApp ? 'shown' : 'hidden'} in app successfully`);
  } catch (error) {
    next(error);
  }
};

// Update display order (Admin only)
const updateDisplayOrder = async (req, res, next) => {
  try {
    const { orders } = req.body; // Array of { vehicleType, displayOrder }
    
    if (!Array.isArray(orders)) {
      return sendError(res, 'orders array is required', 400);
    }
    
    const bulkOps = orders.map(order => ({
      updateOne: {
        filter: { vehicleType: order.vehicleType },
        update: { displayOrder: order.displayOrder },
      },
    }));
    
    await Fare.bulkWrite(bulkOps);
    
    sendSuccess(res, null, 'Display order updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete fare (Admin only)
const deleteFare = async (req, res, next) => {
  try {
    const { vehicleType } = req.params;
    const fare = await Fare.findOneAndDelete({ vehicleType });
    
    if (!fare) {
      return sendError(res, 'Fare configuration not found', 404);
    }
    
    sendSuccess(res, null, 'Fare deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Calculate fare dynamically
const calculateFare = async (req, res, next) => {
  try {
    const { distanceKm, vehicleType, waitingMinutes = 0 } = req.body;
    
    if (!distanceKm || distanceKm <= 0) {
      return sendError(res, 'Distance is required', 400);
    }
    
    const fareConfig = await Fare.findOne({ vehicleType, isActive: true });
    
    if (!fareConfig) {
      return sendError(res, 'Fare configuration not found for this vehicle type', 404);
    }
    
    // Calculate fare using the stored configuration
    let totalFare = 0;
    
    if (distanceKm <= 1) {
      totalFare = fareConfig.firstKmFare;
    } else {
      totalFare = fareConfig.firstKmFare + ((distanceKm - 1) * fareConfig.extraKmFare);
    }
    
    // Add waiting charges if any
    if (waitingMinutes > 0 && fareConfig.waitingChargePerMinute > 0) {
      totalFare += waitingMinutes * fareConfig.waitingChargePerMinute;
    }
    
    // Apply minimum fare if applicable
    if (fareConfig.minFare > 0 && totalFare < fareConfig.minFare) {
      totalFare = fareConfig.minFare;
    }
    
    const commission = Math.round(totalFare * (fareConfig.commissionPercentage / 100));
    const netEarnings = totalFare - commission;
    
    const result = {
      distanceKm: Math.round(distanceKm * 100) / 100,
      vehicleType,
      fareBreakdown: {
        firstKm: Math.min(distanceKm, 1),
        firstFare: fareConfig.firstKmFare,
        extraKm: Math.max(0, distanceKm - 1),
        extraFare: distanceKm > 1 ? (distanceKm - 1) * fareConfig.extraKmFare : 0,
        waitingMinutes,
        waitingCharge: waitingMinutes * fareConfig.waitingChargePerMinute,
        total: Math.round(totalFare),
        commission,
        netEarnings,
        commissionPercentage: fareConfig.commissionPercentage,
      },
      currency: fareConfig.currency,
    };
    
    sendSuccess(res, result, 'Fare calculated successfully');
  } catch (error) {
    next(error);
  }
};

// Bulk create/update fares from admin panel
const bulkUpdateFares = async (req, res, next) => {
  try {
    const { fares } = req.body;
    
    if (!Array.isArray(fares)) {
      return sendError(res, 'fares array is required', 400);
    }
    
    const results = [];
    for (const fareData of fares) {
      const fare = await Fare.findOneAndUpdate(
        { vehicleType: fareData.vehicleType },
        fareData,
        { new: true, upsert: true, runValidators: true }
      );
      results.push(fare);
    }
    
    sendSuccess(res, results, `${results.length} fares updated successfully`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFares,
  getFareByType,
  upsertFare,
  toggleFareStatus,
  toggleShowInApp,
  updateDisplayOrder,
  deleteFare,
  calculateFare,
  bulkUpdateFares,
};