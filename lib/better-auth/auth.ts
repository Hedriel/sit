
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
import bcrypt from "bcrypt";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        password: {
            hash: async (password) => {
                return await bcrypt.hash(password, 10);
            },
            verify: async ({ hash, password }) => {
                return await bcrypt.compare(password, hash);
            }
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // Cache duration in seconds
        },
    },
    user: {
        additionalFields: {
            userMetadata: {
                type: "json",
                required: false,
                input: false,
            },
            appMetadata: {
                type: "json",
                required: false,
                input: false,
            },
            invitedAt: {
                type: "date",
                required: false,
                input: false,
            },
            lastSignInAt: {
                type: "date",
                required: false,
                input: false,
            },
        },
    },
    plugins: [nextCookies()]
});