export const generateVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString()

// Esta funcion genera un código de verificación aleatorio de 6 dígitos.
// Se utiliza para verificar la identidad del usuario durante el proceso de registro o recuperación de contraseña.