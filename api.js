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

const tikcers = new Map();

export const loadTicker = async tickers => {
  const r = await fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(",")}&tsyms=USD&api_key=${API_KEy}`
  );
  const tickerData = await r.json();
  return Object.fromEntries(Object.entries(tickerData).map(([key, value]) => [key, value.USD]))
}

export const subscribeToTiker = (ticker, cb)  =>{
  const subscriber = tickers.get(ticker, []) || []
  tickers.set(ticker, [...subscriber, cb])
};

export const unsubscribeFromTiker = (ticker, cb) => {
  const subscriber = tickers.get(ticker, []) || []
  tickers.set(ticker, subscriber.filter(fn !== cb))
}
