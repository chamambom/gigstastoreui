const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NZD',
})

export const toCurrency = (value: number) => formatter.format(value)