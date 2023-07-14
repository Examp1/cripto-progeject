import WebSocket from 'websocket';

export default ({ app }) => {
  app.$websocket = WebSocket;
};
