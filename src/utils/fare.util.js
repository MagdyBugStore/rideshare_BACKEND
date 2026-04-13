const FIRST_KM_FARE = 10;
const EXTRA_KM_FARE = 7;

const calcFare = (km) => {
  if (km <= 0) return 0;
  if (km <= 1) return FIRST_KM_FARE;
  return Math.round(FIRST_KM_FARE + (km - 1) * EXTRA_KM_FARE);
};

const calcFareBreakdown = (km) => {
  const extraKm = Math.max(0, km - 1);
  const extraFare = Math.round(extraKm * EXTRA_KM_FARE);
  return {
    firstKm: Math.min(km, 1),
    firstFare: FIRST_KM_FARE,
    extraKm,
    extraFare,
    total: calcFare(km),
  };
};

module.exports = { calcFare, calcFareBreakdown, FIRST_KM_FARE, EXTRA_KM_FARE };