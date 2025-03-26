interface User {
    username: string,
    userId: string,
    password: string,
    email: string,
    firstname: string,
    middlename?: string,
    lastname?: string
}

interface Account {
    uid: string,
    credits: number
}

export type { User, Account }