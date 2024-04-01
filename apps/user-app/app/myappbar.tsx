"use client";

import { AppBar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MyAppBar(){
    const session = useSession();

    console.log("From useSession" ,session)
    return (
        <AppBar user={session?.data?.user} onSignin={signIn} onSignout={signOut} />
    )
}