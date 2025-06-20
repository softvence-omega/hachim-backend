export function isSubscriptionActive(createdAt: Date, durationDays: number): boolean {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + durationDays);
  return new Date() < expiryDate;
}
