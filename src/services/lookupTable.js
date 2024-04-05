const lookup_table = {
  "ronaldo" : "Cristiano Ronaldo",
  "Ronaldo" : "Cristiano Ronaldo",
  "Cristiano Ronaldo" : "Cristiano Ronaldo",
  "messi" : "Lionel Messi",
  "Messi" : "Lionel Messi",
  "Lionel Messi" : "Lionel Messi",
  "club" : "club",
  "Club" : "club",
  "national team" : "national_team",
  "natl_team" : "national_team", //One of the inconsistencies in the dataset.
  "National Team" : "national_team",
  "National team" : "national_team",
  "national Team" : "national_team",
  "Domestic" : "domestic",
  "domestic" : "domestic",
  "International" : "international",
  "international" : "international",
  "Cup" : "cup",
  "cup" : "cup",
  "League" : "league",
  "league" : "league"
}

export const lookup = (value) => {
  return lookup_table[value] || "unknown";
}