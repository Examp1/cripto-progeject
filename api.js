// получать стоимость криповалютных пар с апи ( то что сейчас реализовано)
// const API_KEy = "0324c7a2351023626af2970665500fa37f105e33714c76344a8611428cf8e336"


// // TODO refactor to use URLSearchParams
// export const loadTicker = async tickers => {
//   const r = await fetch(
//     `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(",")}&tsyms=USD&api_key=${API_KEy}`
//   );
//   const tickerData = await r.json();
//   return Object.fromEntries(Object.entries(tickerData).map(([key, value]) => [key, value.USD]))

// }

// получать обновления стоимости криптовалюитных пар с апишки ( что что нужно на самом деле)
const API_KEy = "0324c7a2351023626af2970665500fa37f105e33714c76344a8611428cf8e336"

const tickersHandlers = new Map();

console.log(tickersHandlers);

const loadTicker = async () => {
  // debugger
  if (!tickersHandlers.size === 0) {
    return
  }

  const r = await fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers.keys()]}&tsyms=USD&api_key=${API_KEy}`
  );
  const updatedPrices = await r.json();
  Object.fromEntries(Object.entries(updatedPrices).map(([key, value]) => [key, value.USD]))

  // console.log(updatedPrices);

  Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
    console.log(newPrice);
    const handler = tickersHandlers.get(currency) ?? [];
    handler.forEach(fn => fn(newPrice.USD))
  })
}


export const subscribeToTiker = (ticker, cb) => {
  const subscriber = tickersHandlers.get(ticker, []) || []
  tickersHandlers.set(ticker, [...subscriber, cb])
  console.log(tickersHandlers);
};

export const unsubscribeFromTiker = (ticker, cb) => {
  const subscriber = tickersHandlers.get(ticker, []) || []
  tickersHandlers.set(ticker, subscriber.filter(fn !== cb))
}


setInterval(() => {
  loadTicker()
}, 5000);
console.log(tickersHandlers);
