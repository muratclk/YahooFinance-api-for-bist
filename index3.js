const axios = require("axios");
const cheerio = require("cheerio");

async function fetchStocks() {
  const url = "https://www.kap.org.tr/en/bist-sirketler";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const stocks = [];

    // Traverse the HTML here to find the stock codes.
    // For instance, if the stock codes are in a table, you might do something like this:
    $("table tbody tr").each((i, elem) => {
      const stockCode = $(elem).find("td").first().text();
      stocks.push(`${stockCode}.IS`);
    });

    return stocks;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
}

fetchStocks().then((stocks) => {
  console.log("Stocks:", stocks);
});
