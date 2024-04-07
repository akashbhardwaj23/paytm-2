import { Card } from "@repo/ui/card";
import Dashboard from "../../../components/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getUser() {
    const session = await getServerSession(authOptions);

    return session?.user
}


async function getUsersBalance(){
    const user = await getUser();
    const balance = await prisma.balance.findFirst({
        where : {
            userId : Number(user?.id)
        }
    });

    return {
        balance : balance?.amount || 0,
        locked : balance?.locked || 0
    }
}

export interface User {
    name : string;
    email : string;
    number : string;
    id : number;
    Balance : Balance[]
}

type Balance = {
    id : number;
    userId : number;
    amount : number;
    locked : number
}




export  default async function() {
    const user: User = await getUser();
    const {balance, locked} = await getUsersBalance();
    return <div className="w-full p-4 pt-8">

        <div className="font-bold text-3xl uppercase text-[#4F46E5] mb-8">
            Good After Noon, {user?.name}
        </div>
        <Dashboard amount={balance} locked={locked}  />
    </div>
}