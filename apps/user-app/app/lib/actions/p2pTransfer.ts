"use server";


import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";



export async function p2pTransfer(to : string, amount : number){
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return {
            message : "Error while sending the money"
        }
    }

    const toUser = await prisma.user.findFirst({
        where : {
            number : to
        }
    });

    if(!toUser){
        return {
            message : "User Not Found"
        }
    }

    try {  
        await prisma.$transaction(async (tsx) => {
            await tsx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

            const fromBalance = await tsx.balance.findUnique({
                where : {userId : Number(from)}
            });

            console.log('Above Sleep')
            await new Promise(resolve => setTimeout(resolve, 4000));

            console.log('after Sleep')

            // tells the balance of that user 
            if(!fromBalance || fromBalance.amount < amount){
                console.log("Here")
                throw new Error('Insufficient Funds');
            };

            await tsx.balance.update({
                where : {
                    userId : Number(from)
                },
                data : {
                    amount : {decrement : amount}
                }
            });

            await tsx.balance.update({
                where : {
                    userId : toUser.id
                }, 
                data : {
                    amount : {
                        increment : amount
                    }
                }
            });


            await tsx.p2pTransfer.create({
                data : {
                    fromUserId : Number(from),
                    toUserId : toUser.id,
                    amount : amount,
                    timestamp : new Date
                }
            });

        });

        //locking
        
    } catch (error) {
        console.log(error)
    }

}