import path from "path";
import dotenv from "dotenv"
import app from "./src/app";

switch (process.env.NODE_ENV) {
    case "production": {
        dotenv.config({path: path.join(__dirname, "./env/.production.env")})
        break
    }
    case "develop": {
        dotenv.config({path: path.join(__dirname, "./env/.develop.env")})
        break
    }
    default: {
        throw new Error("NODE_ENV 를 설정하지 않았습니다.")
    }
}

// Running App
app()