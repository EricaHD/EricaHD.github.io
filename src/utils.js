export const roundToNearestCent = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;
