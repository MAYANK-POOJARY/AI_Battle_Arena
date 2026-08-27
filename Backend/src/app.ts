import express from "express"
import cors from "cors"
import useGraph from "./ai/graph.ai.js"

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
    methods:["GET", "POST"]
}))

app.get('/health', (req,res) =>{
    res.status(200).json({
        message: "the service is runninng"
    })
})

app.post('/invoke', async (req, res) =>{

    const {input} = req.body;
    const result = await useGraph(input)

    res.status(200).json({
        message: "The Graph executed successfully",
        success: true,
        result
    })
})


export default app;