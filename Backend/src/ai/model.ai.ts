import config from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq} from "@langchain/groq"
import { ChatCohere } from "@langchain/cohere";

export const mistralModel = new ChatMistralAI({
    model:"ministral-8b-latest",
    apiKey: config.MISTRAL_API_KEY
})

export const qroqModel = new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey: config.GROQ_API_KEY
})

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY
})