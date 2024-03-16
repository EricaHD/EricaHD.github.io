export const roundToNearestCent = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export const twoPercentOfIncome = (incomeArray, stiIdx) => {
  let total = 0;
  for (let i = 0; i < incomeArray.length; i++) {
    // Round per paycheck (instead of once at the end of the calculation)
    const income = (i === stiIdx) ? incomeArray[i] : roundToNearestCent(incomeArray[i] / 24);
    total += roundToNearestCent(income * 0.02);
  }
  return total;
}
