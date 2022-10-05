import express from 'express'

// Configuration
const PORT = 12345

const app = express()

app.use(express.json())

app.get('/', (_, res) => res.send('ok'))

app.listen(PORT, () => console.log('Listening on port %d', PORT))
