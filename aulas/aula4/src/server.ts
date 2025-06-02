import express from "express"
import routes from "./routes/user.routes"
import produtoRoutes from "./routes/produtoRoutes"
import { AppDataSource } from "./database/data-source"

const app = express()

app.use(express.json())
app.use('/api', routes)
app.use('/api', produtoRoutes)

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000')
    })
}).catch((error) => {
    console.error('Error during Data Source initialization:', error)
})