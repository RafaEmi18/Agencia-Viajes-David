import { MailtrapClient } from "mailtrap"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN
})

export const sender = {
  email: "hello@socialmeet.site",
  name: "Verification Team",
}
