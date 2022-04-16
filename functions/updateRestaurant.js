const { table } = require('./helpers/airtable');
const formattedReturn = require('./helpers/formattedReturn');
exports.handler = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updateRestaurant = await table.update([{ id, fields }]);
    return formattedReturn(200, updateRestaurant);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
