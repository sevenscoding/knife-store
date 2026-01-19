import { WebSocketServer } from 'ws'

const PORT = process.env.PORT || 3000
const wss = new WebSocketServer({ port: PORT })

wss.on('connection', ws => {
  ws.send(
    JSON.stringify({
      type: 'connected'
    })
  )

  const interval = setInterval(() => {
    ws.send(
      JSON.stringify({
        type: 'product.updated',
        data: {
          id: 'knife_1',
          changes: {
            price: Math.round(Math.random() * 100),
            inStock: Math.random() > 0.5,
            updatedAt: new Date().toISOString()
          }
        }
      })
    )
  }, 3000)

  ws.on('close', () => clearInterval(interval))
})

console.log(`WS server running on ${PORT}`)
