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

const API_KEY = "db08fd4dc7fe107d9e23172806cf758b07d49e410df0ac43425506f1b8068bc0"

// const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`)

const tickersHandlers = new Map();

let socket;


const initSocket = () => {
  socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`)
}

function subscribeToTikerOnWs(ticker) {
  const message = JSON.stringify({
    "action": "SubAdd",
    "subs": [`5~CCCAGG~${ticker}~USD`]
  })
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(message);
    return
  }
  if (socket) {
    socket.addEventListener('open', () => {
      socket.send(message);
    }, { once: true })
  }
}

export const subscribeToTiker = (ticker, cb) => {
  const subscriber = tickersHandlers.get(ticker, []) || []
  tickersHandlers.set(ticker, [...subscriber, cb])
  subscribeToTikerOnWs(ticker)
};

export const unsubscribeFromTiker = (ticker) => {
  tickersHandlers.delete(ticker)
  // const subscriber = tickersHandlers.get(ticker, []) || []
  // tickersHandlers.set(ticker, subscriber.filter(fn !== cb))
}

if (process.client) {
  initSocket();
}
if (socket) {
  const AGGRINDEX = "5";
  socket.addEventListener("message", e => {
    const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data)
    if (type !== AGGRINDEX) {
      return
    }
    // debugger
    const handler = tickersHandlers.get(currency) ?? [];
    handler.forEach(fn => fn(newPrice))
  })
}

