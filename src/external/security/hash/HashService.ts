import * as bcrypt from 'bcrypt'

export default class PasswordService {
    private saltRounds: number =
        (process.env.SALT_OR_ROUNDS && +process.env.SALT_OR_ROUNDS) || Math.floor(Math.random() * 10) + 1

    async hashPassword(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(this.saltRounds)
        const hash: string = await bcrypt.hash(password, salt)
        return hash
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }
}
