// const yahooFinance = require("yahoo-finance2").default;
// const stocks = require("./stocks");

// async function fetchStockData(symbol) {
//   try {
//     const quote = await yahooFinance.quote(symbol);
//     // console.log(`${JSON.stringify(quote)}`);
//     console.log(`Symbol: ${quote.symbol}, Price: ${quote.regularMarketPrice}`);
//   } catch (error) {
//     console.error(`Error fetching data for ${symbol}: `, error);
//   }
// }

// async function fetchStockAllData(symbol) {
//   try {
//     const quote = await yahooFinance.quote(symbol);
//     console.log(`${JSON.stringify(quote)}`);
//     //regularMarketChangePercent

//     // console.log(`Symbol: ${quote.symbol}, Price: ${quote.regularMarketPrice}`);
//   } catch (error) {
//     console.error(`Error fetching data for ${symbol}: `, error);
//   }
// }

// // fetchStockAllData("EUPWR.IS");
// stocks.forEach(fetchStockData);

const yahooFinance = require("yahoo-finance2").default;
const stocks = require("./stocks");

let stockData = [];

async function fetchStockData(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol);
    stockData.push({
      symbol: quote.symbol,
      changePercent: quote.regularMarketChangePercent,
    });
  } catch (error) {
    console.error(`Error fetching data for ${symbol}: `, error);
  }
}

Promise.all(stocks.map(fetchStockData)).then(() => {
  // Sort by changePercent
  stockData.sort((a, b) => b.changePercent - a.changePercent);

  console.log("Top 10 Increased Stocks:");
  for (let i = 0; i < 10; i++) {
    console.log(
      `Symbol: ${stockData[i].symbol}, Change Percent: ${stockData[i].changePercent}`
    );
  }

  console.log("\nTop 10 Decreased Stocks:");
  for (let i = stockData.length - 1; i >= stockData.length - 10; i--) {
    console.log(
      `Symbol: ${stockData[i].symbol}, Change Percent: ${stockData[i].changePercent}`
    );
  }
});
