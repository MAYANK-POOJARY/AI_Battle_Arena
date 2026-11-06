import "dotenv/config"

type CONFIG = {
    readonly MISTRAL_API_KEY: string,
    readonly GROQ_API_KEY : string,
    readonly COHERE_API_KEY: string
}

const config: CONFIG = {
    MISTRAL_API_KEY : process.env.MISTRAL_API_KEY || "",
    GROQ_API_KEY : process.env.GROQ_API_KEY || "",
    COHERE_API_KEY : process.env.COHERE_API_KEY || ""
}

export default config