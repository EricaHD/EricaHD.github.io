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
    total += (i === stiIdx) ? incomeArray[i] : incomeArray[i] / 24;
  }
  return roundToNearestCent(total * 0.02);
}
