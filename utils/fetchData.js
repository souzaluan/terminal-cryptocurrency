const axios = require("axios");

const url =
  "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";

module.exports = async () => {
  return await axios.get(url).then((result) => {
    const response = result.data;

    const formattedObj = response.data.map((item) => {
      const name = item.slug;

      return [
        name[0].toUpperCase() + name.substr(1),
        String(item.metrics.market_data.price_usd.toFixed(2)),
      ];
    });

    return formattedObj;
  });
};
