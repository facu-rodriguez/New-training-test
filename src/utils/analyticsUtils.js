export const event = (category, action, label, value) => ({
  hitType: 'event',
  eventCategory: category,
  eventAction: action,
  eventLabel: label,
  eventValue: value
});
