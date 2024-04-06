"use server";

// server action
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function createOnRampTransactions(amount : number, provider : string ) {


    const session = await getServerSession(authOptions);
    // this token should come from the bank
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if(!userId){
        return {
            message : "User not found"
        }
    }


    await prisma.onRampTransaction.create({
        data : {
            startTime : new Date(),
            status : "Processing",
            amount : amount,
            provider: provider,
            userId : Number(userId),
            token 
        }
    });

    return {
        message : "Transaction created"
    }
}