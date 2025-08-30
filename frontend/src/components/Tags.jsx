export const eventTags = [
  "Art", "Activism", "Animals", "Cleanup", "Festival", "Forests",
  "Green Tech", "Seminar", "Tree Planting", "Park Restoration",
  "Urban Gardening", "Volunteering", "Wildlife", "Workshop",
  "Zero Waste", "Other"
];

export const volunteerTags = [
  "Animals", "Community Service", "Education", "Tree Planting",
  "Cleanup", "Other"
];

export const shopTags = [
  "Clothes", "Food", "Second-hand", "Upcycled/Recycled", "Vegan", "Zero Waste", "Other"
];

export const dineTags = [
  "Vegan", "Vegetarian", "Plant-Based", "Organic Ingredients",
  "Other"
];

/**
 * Utility function: get tags for each entity type
 */
export const getTagsForType = (type) => {
  switch (type) {
    case "event":
      return eventTags;
    case "volunteer":
      return volunteerTags;
    case "shop":
      return shopTags;
    case "dine":
      return dineTags;
    default:
      return [];
  }
};
