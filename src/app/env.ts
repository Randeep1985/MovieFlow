import { storage } from "@/models/server/config"

const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apiKey: String(process.env.APPWRITE_API_KEY),
        dbKey: String(process.env.APPWRITE_DB_KEY),
        votes: String(process.env.DB_VOTES_KEY),
        comments: String(process.env.DB_COMMENTS_KEY),
        answers: String(process.env.DB_ANSWERS_KEY),
        questions: String(process.env.DB_QUESTIONS_KEY),
        storageAttachment: String(process.env.STORAGE_ATTACHMENT_KEY)
    }
}


export default env