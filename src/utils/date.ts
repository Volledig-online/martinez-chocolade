/**
 * Date utility functions for order management
 */

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the future
 */
export const isFuture = (date: Date): boolean => {
  const today = new Date();
  return date > today;
};

/**
 * Format date for future orders display
 * Returns "Morgen", "Overmorgen", or "Wo 25 jun" format
 */
export const formatOrderDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Morgen';
  }

  if (date.toDateString() === dayAfterTomorrow.toDateString()) {
    return 'Overmorgen';
  }

  // Format as "Wo 25 jun" or "Do 26 jun"
  const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
  const months = [
    'jan',
    'feb',
    'mrt',
    'apr',
    'mei',
    'jun',
    'jul',
    'aug',
    'sep',
    'okt',
    'nov',
    'dec',
  ];

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];

  return `${dayName} ${dayNumber} ${monthName}`;
};

/**
 * Create date helpers for generating test data
 */
export const createDateHelpers = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return {
    today,
    tomorrow,
    dayAfterTomorrow,
    nextWeek,
  };
};
