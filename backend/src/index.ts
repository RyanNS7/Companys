import { app } from "./main/server"

require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Iniciado com sucesso na porta ${process.env.PORT}`)
})
