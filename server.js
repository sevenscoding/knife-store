import http from 'http'
import { WebSocketServer } from 'ws'
import fs from 'fs'
import path from 'path'
import url from 'url'

const PORT = process.env.PORT || 10000
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url)

  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'dist', 'index.html')
  }

  fs.createReadStream(filePath).pipe(res)
})

const wss = new WebSocketServer({ server })

wss.on('connection', ws => {
  const cartInterval = setInterval(() => {
    ws.send(
      JSON.stringify({
        type: 'cart.synced',
        data: {
          cart: {
            items: [],
            subtotal: 0,
            currency: 'USD',
            updatedAt: new Date().toISOString()
          }
        }
      })
    )
  }, 8000)

  const productInterval = setInterval(() => {
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
  }, 5000)

  ws.on('close', () => {
    clearInterval(cartInterval)
    clearInterval(productInterval)
  })
})

server.listen(PORT, () => {
  console.log(`HTTP + WS server running on ${PORT}`)
})
