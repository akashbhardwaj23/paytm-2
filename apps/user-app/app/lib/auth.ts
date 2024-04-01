import CredentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import db from "@repo/db/client"
import {z} from "zod"
import bcryptjs from "bcryptjs"



export const userInput = z.object({
    phone : z.string().regex(/^\d{10}$/),
    password : z.string().min(5)
})

export const authOptions = {
    providers : [
        CredentialProvider({
            name : "Credentials",
            credentials : {
                phone : {label : "Phone Number", type: "text", placeholder : "1234567890"},
                password : {label: "Password", type : "password", placeholder : "Password"}
            },
            async authorize(credentials : any){
           
                const success = userInput.safeParse(credentials);
                if(!success.success){
                    return null;
                }
                

                const hashPassword = await bcryptjs.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where : {
                        number : credentials.phone
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcryptjs.compare(credentials.password, existingUser.password);
                    if(passwordValidation){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.email
                        }
                    }

                    return null;
                };


                try {
                    const user = await db.user.create({
                        data : {
                            number : credentials.phone,
                            password : hashPassword
                        }
                    });

                    return {
                        id : user.id.toString(),
                        name : user.name,
                        email : user.number
                    }
                } catch (error) {
                    console.log(error)
                }



                return null;
            }
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID || "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
            clientId : process.env.GITHUB_CLIENT_ID || "",
            clientSecret : process.env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    callbacks : {
        session : async ({session, token, user}: any) => {
            if(session && session.user){
                session.user.id = token.sub;
            }

            console.log(session);
            return session
        }
    },
    secret : process.env.NEXT_SECRET,
    pages : {
        signIn : ""
    }
}