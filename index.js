const yahooFinance = require("yahoo-finance2").default;
const stocks = require("./stocks");

async function fetchStockData(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol);
    // console.log(`${JSON.stringify(quote)}`);
    console.log(`Symbol: ${quote.symbol}, Price: ${quote.regularMarketPrice}`);
  } catch (error) {
    console.error(`Error fetching data for ${symbol}: `, error);
  }
}

stocks.forEach(fetchStockData);
