import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

import prisma from "@repo/db/client";
import { P2PTransaction } from "../../../components/P2PTransaction";


async function getP2pTransaction(){
    const session = await getServerSession(authOptions);
    const p2pTransaction = await prisma.p2pTransfer.findMany({
        where : {
            fromUserId : Number(session?.user?.id)
        }
    });


    return p2pTransaction.map(t => ({
        amount : t.amount,
        time : t.timestamp,
        id : Number(t.id)
    }))
}



export default async function(){
   // This is the P2P transactions Page
    const p2pTransactions = await getP2pTransaction();
    return <div className="w-full">
        <P2PTransaction transactions={p2pTransactions}/>
    </div>
}