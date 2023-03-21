import 'dotenv/config'

export const config = {
    redisPort: process.env.REDIS_PORT!,
    redisHost: process.env.REDIS_HOST!,
    nodeMailerHost: process.env.NODEMAILER_HOST!,
    nodeMailerPort: process.env.NODEMAILER_PORT!
}