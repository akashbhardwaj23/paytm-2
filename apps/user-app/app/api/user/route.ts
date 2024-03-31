import {PrismaClient } from "@repo/db/client"
import { NextResponse } from "next/server"


const client = new PrismaClient()

export async function GET() {
    await client.user.create({
     data : {
        email : "akash123@gmail.com",
        name : "Akash",
     }
    })

    return NextResponse.json({
        message : "User Created Successfully"
    })
}