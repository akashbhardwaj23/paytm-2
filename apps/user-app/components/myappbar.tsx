"use client";

import { AppBar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyAppBar(){
    const session = useSession();
    const router = useRouter();
    
    console.log("From useSession" ,session)
    return (
        <AppBar user={session.data?.user} onSignin={signIn} onSignout={async () => {
            
            await signOut();

            router.push("/api/auth/signin")
            
            
        }} />
    )
}