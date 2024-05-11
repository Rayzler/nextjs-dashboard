﻿import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "@auth/core/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        return user.rows[0];
    } catch (error) {
        console.error(`Failed to fetch user: ${error}`);
        throw new Error("Failed to fetch user");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({
                email: z.string().email(),
                password: z.string().min(6)
            }).safeParse(credentials);
            if (!parsedCredentials.success) return null;

            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;

            const passwordsMatch = await compare(password, user.password);
            if (!passwordsMatch) return null;

            return user;
        }
    })]
});