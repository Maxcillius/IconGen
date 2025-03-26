import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET as string

const signjwt = (data: any) => {
    const signedData = jwt.sign(data, secret, { algorithm: 'RS256' })
    return signedData
}

const verifyjwt = (data: any) => {
    const valid = jwt.verify(data, secret);
    return valid
}