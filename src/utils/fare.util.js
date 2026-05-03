const FARE_CONFIG = {
  car:        { firstKmFare: 10, extraKmFare: 7,  commissionPct: 0.20 },
  motorcycle: { firstKmFare:  8, extraKmFare: 5,  commissionPct: 0.15 },
  tukutuk:    { firstKmFare:  7, extraKmFare: 4,  commissionPct: 0.15 },
  altTukutuk: { firstKmFare:  8, extraKmFare: 5,  commissionPct: 0.15 },
};

const DEFAULT_CONFIG = FARE_CONFIG.car;

const _getConfig = (carType) => FARE_CONFIG[carType] ?? DEFAULT_CONFIG;

const calcFareBreakdown = (km, carType = 'car') => {
  const { firstKmFare, extraKmFare, commissionPct } = _getConfig(carType);
  const extraKm   = Math.max(0, km - 1);
  const extraFare = Math.round(extraKm * extraKmFare);
  const total     = km <= 0 ? 0 : km <= 1 ? firstKmFare : Math.round(firstKmFare + extraFare);
  const commission = Math.round(total * commissionPct);
  const netEarnings = total - commission;
  return {
    firstKm:    Math.min(km, 1),
    firstFare:  firstKmFare,
    extraKm,
    extraFare,
    total,
    commission,
    netEarnings,
    commissionPct,
  };
};

const calcFare = (km, carType = 'car') => calcFareBreakdown(km, carType).total;

const getFareConfig = (carType) => _getConfig(carType);

module.exports = { calcFare, calcFareBreakdown, getFareConfig, FARE_CONFIG };
