import { PrismaClient } from "@prisma/client";


// Initialize a new PrismaClient instance

const prismaClientSingleton = () => {
    return new PrismaClient();
}


// decare  in global namespace prismaGlobal type
declare global {
    var prismaGlobal : undefined | ReturnType<typeof prismaClientSingleton>
}
// decare prisma Globally
const prisma : ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma

if(process.env.NODE_ENV === "development"){
    globalThis.prismaGlobal = prisma;
}


/*
    NEED TO UNDERSTAND THIS FILE BETTER
*/