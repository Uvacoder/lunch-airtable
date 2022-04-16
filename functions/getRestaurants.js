const { table } = require('./helpers/airtable');
const formattedReturn = require('./helpers/formattedReturn');
exports.handler = async () => {
  try {
    const restaurants = await table.select().firstPage();
    const formattedRestaurants = restaurants.map((restaurant) => ({
      id: restaurant.id,
      ...restaurant.fields,
    }));
    return formattedReturn(200, formattedRestaurants);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
