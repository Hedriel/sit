
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { admin } from "better-auth/plugins";

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
        requireEmailVerification: false,
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
            role: {
                type: "string",
                required: true,
                input: true,
            },
            first_name: {
                type: "string",
                required: true,
                input: true,
            },
            last_name: {
                type: "string",
                required: true,
                input: true,
            },
        },
    },
    plugins: [nextCookies(), admin()]
});