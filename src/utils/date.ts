/**
 * Date utility functions for order management
 */

/**
 * Check if a date is today
 */
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return false;

  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the future
 */
export const isFuture = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return false;

  const today = new Date();
  return dateObj > today;
};

/**
 * Format date for future orders display
 * Returns "Morgen", "Overmorgen", or "Wo 25 jun" format
 */
export const formatOrderDate = (date: Date | string): string => {
  // Ensure date is a Date object
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Ongeldige datum';
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  if (dateObj.toDateString() === tomorrow.toDateString()) {
    return 'Morgen';
  }

  if (dateObj.toDateString() === dayAfterTomorrow.toDateString()) {
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

  const dayName = days[dateObj.getDay()];
  const dayNumber = dateObj.getDate();
  const monthName = months[dateObj.getMonth()];
  const year = dateObj.getFullYear().toString().slice(-2);

  return `${dayName} ${dayNumber} ${monthName} ${year}`;
};

/**
 * Create date helpers for generating test data
 */
export const createDateHelpers = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const getDaysAfterTomorrow = (days: number) => {
    const date = new Date(today);
    date.setDate(today.getDate() + days);
    return date;
  };

  return {
    today,
    tomorrow,
    getDaysAfterTomorrow,
  };
};
