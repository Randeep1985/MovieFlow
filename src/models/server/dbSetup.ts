import { databases } from "./config"
import env from "@/app/env";

export default async function getDb(){
    try {
        await databases.get(env.appwrite.dbKey)
        console.log("Database connected")
    } catch (error) {
        console.log(error, "Database not connected")
    }

    return databases
} 