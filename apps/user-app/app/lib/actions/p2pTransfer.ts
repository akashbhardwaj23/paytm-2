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
            const fromBalance = await tsx.balance.findUnique({
                where : {userId : Number(from)}
            });

            console.log('Above Sleep')
            await new Promise(resolve => setTimeout(resolve, 4000));

            console.log('Below Sleep')

            // tells the balance of that user 
            if(!fromBalance || fromBalance.amount < amount){
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

        });

        
        
    } catch (error) {
        
    }

}