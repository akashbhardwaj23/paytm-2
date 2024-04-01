import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";


const handler = NextAuth(authOptions);

// new syntax to handle both get and post request
export {handler as GET, handler as POST}