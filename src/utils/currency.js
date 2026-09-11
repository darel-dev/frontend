const cfaFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "XAF",
  maximumFractionDigits: 0,
});

export const formatCfa = (amount) => cfaFormatter.format(Number(amount) || 0);
