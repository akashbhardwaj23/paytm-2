"use client";

import {AppBar} from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";


export const MyAppBar = () => {
    const session = useSession();

    return (
        <AppBar user={session?.data?.user} onSignin={signIn} onSignout={signOut} />
    )

}
