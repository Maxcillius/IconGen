import z from "zod"

const signUp = z.object({
    email: z.string().min(6, { message: "Email is too small"}).email({ message: "Email is invalid"}),
    password: z.string().min(6, { message: "Password is too small"}).max(26 , { message: "Password is too long"}),
})

const signIn = z.object({
    email: z.string().min(6).email({ message: "Email is invalid"}),
    password: z.string().min(6).max(26)
})

export { signIn, signUp }