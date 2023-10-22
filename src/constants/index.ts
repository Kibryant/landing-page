export const expirationTime = Math.floor(Date.now() / 1000) + 5 * 60 * 60 // 5 hours
export const saltOrRounds = process.env.SALT_OR_ROUNDS ? +process.env.SALT_OR_ROUNDS : 5
