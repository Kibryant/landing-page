export const expirationTime = Math.floor(Date.now() / 1000) + 5 * 60 * 60 // 5 hours
export const saltOrRounds = process.env.SALT_OR_ROUNDS ? +process.env.SALT_OR_ROUNDS : 5
export const THOUSAND_MILLISECONDS = 1000
export const SECONDS_IN_A_HOUR = 3600
export const HOURS_IN_A_DAY = 24
export const { signal } = new AbortController()
export const host = process.env.HOST || 'localhost'
export const port = process.env.PORT || 3000
export const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
export const baseUrl = `${protocal}://${host}:${port}`
export const ONE_WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7
export const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7
