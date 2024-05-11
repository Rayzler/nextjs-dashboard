﻿import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIdIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                return isLoggedIdIn;
            } else if (isLoggedIdIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;