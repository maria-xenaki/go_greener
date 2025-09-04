export const eventTags = [
  "Art", "Activism", "Animals", "Cleanup", "Festival", "Forests",
  "Green Tech", "Kids friendly","Seminar", "Tree Planting", "Park Restoration",
  "Urban Gardening", "Volunteering", "Wildlife", "Workshop",
  "Zero Waste", "Other"
];

export const volunteerTags = [
  "Animals", "Birds", "Community Service", "Education", "Tree Planting",
  "Wildlife", "Other"
];

export const shopTags = [
  "Clothes", "Cleaning Products", "Food", "Personal care", "Second-hand", "Upcycled/Recycled", "Vegan", "Zero Waste", "Other"
];

export const dineTags = [
  "Vegan", "Vegetarian", "Plant-Based", "Raw",
  "Other"
];

/* Get tags for each entity type */
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
