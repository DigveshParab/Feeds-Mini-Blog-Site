import {jwtVerify} from 'jose'

const JWT_SECRETKEY = new TextEncoder().encode(process.env.JWT_SECRET || "secret_to_jwt");
 

export async function verifyToken(token: string){
    try {
        const {payload} = await jwtVerify(token,JWT_SECRETKEY)
        return payload; // my user object
    } catch (err) {
        console.log(err,"goes here")
        return null;
    }
}