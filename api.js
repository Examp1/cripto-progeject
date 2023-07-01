const API_KEy = "0324c7a2351023626af2970665500fa37f105e33714c76344a8611428cf8e336"


// TODO refactor to use URLSearchParams
export const loadTicker = async tickers => {
  const r = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(",")}&api_key=${API_KEy}`
  );
  const tickerData = await r.json();
  return Object.fromEntries(Object.entries(tickerData).map(([key, value]) => [key, 1 / value]))

}
