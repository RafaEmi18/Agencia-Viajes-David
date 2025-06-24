import { mailtrapClient, sender } from "./mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { response } from "express"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verifica tu correo electrónico",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verefication"
        })

        console.log("Correo enviado satisfactoriamente:", response)
    } catch (error) {
        console.error("Error en el envio de correo:", error)
        throw new Error(`Fallo verificar Email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient, 
            template_uuid: "777f37c8-f041-4e98-a615-12be7d62dc1a",
            template_variables: {
                name: name
            },
        })

        console.log("Correo de bienvenida enviado satisfactoriamente", response)
    } catch (error) {
        console.error("Error en el envio de correo de bienvenida:", error)
        throw new Error(`Fallo enviar correo de bienvenida: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Restablece tu contraseña",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Correo de restablecimiento de contraseña enviado satisfactoriamente", response)
    } catch (error) {
        console.error("Error en el envio de correo de restablecimiento de contraseña:", error)
        throw new Error(`Fallo enviar correo de restablecimiento de contraseña: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Tu contraseña ha sido restablecida",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Success"
        })

        console.log("Correo de éxito de restablecimiento de contraseña enviado satisfactoriamente", response)
    } catch (error) {
        console.error("Error en el envio de correo de éxito de restablecimiento de contraseña:", error)
        throw new Error(`Fallo enviar correo de éxito de restablecimiento de contraseña: ${error}`)
    }
}