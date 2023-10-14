export const getSecretKey: () => string = () => {
    const SECRET_KEY = process.env.SECRET_KEY

    if (!SECRET_KEY || SECRET_KEY.length === 0) throw new Error('The enviroment variable SECRET_KEY is not set!')

    return SECRET_KEY
}
