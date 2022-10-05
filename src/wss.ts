import WebSocket, { WebSocketServer } from 'ws'

// TODO: this is copy-pasted from a websocket tutorial, nothing to see here

const wss = new WebSocketServer({ port: 12346 })

export function startWSServer(): void {
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data, isBinary) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("caca");
                }
            })
        })
    })
}
