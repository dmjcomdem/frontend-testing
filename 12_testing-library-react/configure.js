// @ts-check

const countries = require('country-list').getNames();

module.exports = (app) => {
  app.get('/countries', (req, res) => {
    const { term } = req.query;
    const result = countries.filter((c) => c.toLowerCase().startsWith(term.toLowerCase()));
    res.json(result);
  });
};
