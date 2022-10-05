import express from 'express'

// Configuration
const PORT = 12345
const CODE = 'unu-gaming'

function generateCode(): string {
    return CODE
}

async function startServer() {
    const app = express()

    app.use(express.json())
    
    const code = generateCode()
    
    app.get('/' + code, (_, res) => {
        res.send('On est bon')
    })
    
    app.get('*', (req, res) => {
        const code = req.path.substring(1)
        res.send(`Vous êtes bien sur un serveur UNU mais le code "${code}" est invalide. Redemandez l'URL à l'hôte.`)
    })
    
    app.listen(PORT, () => console.log('Listening on port %d', PORT))
}


startServer().then()
