import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { jwtDecode } from "jwt-decode";
import { sessionStorage } from "~/session.server";

export interface User {
    id: string;
    email: string;
    name: string;
    username?: string;
    password?: string;
    accessToken: string;
    rawIdToken: string;
}

export const authenticator = new Authenticator<User>();

authenticator.use(
    await OAuth2Strategy.discover<User>(
        process.env.AUTH_ISSUER!,
        {
            clientId: process.env.OIDC_CLIENT_ID!,
            clientSecret: process.env.OIDC_CLIENT_SECRET!,
            redirectURI: process.env.OIDC_CALLBACK_URL!,
            scopes: ["openid", "email", "profile"],
        },
        async ({ tokens }) => {
            const idToken = tokens.idToken?.();
            const accessToken = tokens.accessToken?.();

            if (!idToken || !accessToken) throw new Error("Missing tokens");

            const payload = jwtDecode<any>(idToken);
            console.log("Decoded ID Token Payload:", payload);

            return {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                accessToken,
                rawIdToken: idToken,
            };
        }
    ),
    "authaction"
);