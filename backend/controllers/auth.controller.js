import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
import { generateVerificationToken } from "../utils/generateVerificationToken.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"

// Actualización completa de DB para usar PostgreSQL con Prisma

const prisma = new PrismaClient()

export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            throw new Error('Todos los campos son obligatorios')
        }
        
        const userAlreadyExists = await prisma.user.findUnique({ 
            where: { email } 
        })
        console.log("Usuario existe!:", userAlreadyExists)
        
        if (userAlreadyExists) {
            return res.status(400).json({success:false, message: 'El usuario ya existe'})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = generateVerificationToken()
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                verificationToken,
                verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
            }
        })

        // jwt
        generateTokenAndSetCookie(res, user.id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success:true, 
            message: 'Usuario creado con Exito!', 
            user: {
                ...user,
                password: undefined, // No enviar la contraseña en la respuesta
            }
        })
        
    } catch (error) {
        res.status(400).json({success:false, message: error.message})
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body

    try {
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: code,
                verificationExpiresAt: {
                    gt: new Date() // Token no expirado
                }
            }
        })

        if (!user) {
            return res.status(400).json({success:false, message: 'Token de verificación inválido o expirado'})
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationExpiresAt: null
            }
        })

        await sendWelcomeEmail(updatedUser.email, updatedUser.name)
        
        res.status(200).json({
            success:true, 
            message: 'Correo verificado con éxito',
            user: {
                ...updatedUser,
                password: undefined,
            }
        })
    } catch (error) {
        console.error("Error al verificar el correo:", error)
        res.status(500).json({success:false, message: 'Error en el servidor al verificar el correo'})
    }
} 

export const login = async (req, res) => {
    const  { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({ 
            where: { email } 
        })
        
        if (!user) {
            return res.status(400).json({success:false, message: 'Usuario no encontrado'})
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({success:false, message: 'Contraseña / correo incorrectos'})
        }

        generateTokenAndSetCookie(res, user.id)

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        })

        res.status(200).json({
            success:true,
            message: 'Inicio de sesión exitoso',
            user: {
                ...updatedUser,
                password: undefined,
            }
        })
    } catch (error) {
        console.error("Error al iniciar sesión:", error)
        res.status(400).json({success:false, message: error.message})
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({success:true, message: 'Sesión cerrada con éxito'})
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await prisma.user.findUnique({ 
            where: { email } 
        })
        
        if (!user) {
            return res.status(400).json({success:false, message: 'Usuario no encontrado'})
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpiresAt: resetTokenExpiresAt
            }
        })

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`)
        
        res.status(200).json({
            success:true,
            message: 'Correo de restablecimiento de contraseña enviado con éxito',
        })
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error)
        res.status(400).json({success:false, message: 'Error en el servidor al restablecer la contraseña'})
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpiresAt: {
                    gt: new Date() // Token no expirado
                }
            }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Token invalido o expirado" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpiresAt: null
            }
        })

        await sendResetSuccessEmail(user.email)

        res.status(200).json({ success: true, message: "Contraseña reestablecida con exito" })
    } catch (error) {
        console.log("Error al restablecer la contraseña ", error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                lastLogin: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
                // password: false // Excluir contraseña
            }
        })
        
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error("Error al verificar la autenticación:", error)
        res.status(500).json({success:false, message: 'Error en el servidor al verificar la autenticación'})
    }
}

// Cerrar conexión de Prisma cuando la app termine
process.on('beforeExit', async () => {
    await prisma.$disconnect()
})