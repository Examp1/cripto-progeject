const API_KEY = "db08fd4dc7fe107d9e23172806cf758b07d49e410df0ac43425506f1b8068bc0"

const tickersHandlers = new Map();

let socket;


const initSocket = () => {
  socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`)
}

const sendToWebSocket = (message) => {
  const stringifyMSG = JSON.stringify(message)
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(stringifyMSG);
    return
  }
  if (socket) {
    socket.addEventListener('open', () => {
      socket.send(stringifyMSG);
    }, { once: true })
  }
}
const subscribeToTikerOnWs = (ticker) => {
  sendToWebSocket({
    "action": "SubAdd",
    "subs": [`5~CCCAGG~${ticker}~USD`]
  })
}
const unsubscribeToTikerOnWs = (ticker) => {
  sendToWebSocket({
    "action": "SubRemove",
    "subs": [`5~CCCAGG~${ticker}~USD`]
  })
}
export const subscribeToTiker = (ticker, cb) => {
  const subscriber = tickersHandlers.get(ticker, []) || []
  tickersHandlers.set(ticker, [...subscriber, cb])
  subscribeToTikerOnWs(ticker)
};

export const unsubscribeFromTiker = (ticker) => {
  tickersHandlers.delete(ticker)
  unsubscribeToTikerOnWs(ticker)
}

if (process.client) {
  initSocket();
}
if (socket) {
  const AGGRINDEX = "5";
  socket.addEventListener("message", e => {
    const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data)
    if (type !== AGGRINDEX || newPrice === undefined) {
      return
    }
    // debugger
    const handler = tickersHandlers.get(currency) ?? [];
    handler.forEach(fn => fn(newPrice))
  })
}

