import http from 'http'
import { WebSocketServer } from 'ws'
import fs from 'fs'
import path from 'path'
import url from 'url'

const PORT = process.env.PORT || 10000
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url)

  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'dist', 'index.html')
  }

  const ext = path.extname(filePath)
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  res.writeHead(200, { 'Content-Type': contentType })
  fs.createReadStream(filePath).pipe(res)
})

const wss = new WebSocketServer({ server })

wss.on('connection', ws => {
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
  }, 5000)

  ws.on('close', () => clearInterval(interval))
})

server.listen(PORT, () => {
  console.log(`HTTP + WS server running on ${PORT}`)
})
