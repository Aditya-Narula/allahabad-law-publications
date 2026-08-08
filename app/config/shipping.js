export const FREE_POSTAL_THRESHOLD = 500;
export const POSTAL_CHARGE = 60;

export function calculatePostalCharge(orderValue) {
  const value = Number(orderValue) || 0;

  if (value > 0 && value < FREE_POSTAL_THRESHOLD) {
    return POSTAL_CHARGE;
  }

  return 0;
}