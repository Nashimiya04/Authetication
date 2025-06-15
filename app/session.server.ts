// import { createCookieSessionStorage } from "@remix-run/node";

// const sessionSecret = process.env.SESSION_SECRET!;
// if (!sessionSecret) throw new Error("SESSION_SECRET must be set");

// export const sessionStorage = createCookieSessionStorage({
//     cookie: {
//         name: "__session",
//         secrets: [process.env.SESSION_SECRET!],
//         sameSite: "lax",
//         path: "/",
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//     },
// });

// export const getSession = (request: Request) =>
//     sessionStorage.getSession(request.headers.get("Cookie"));





// app/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET!;
if (!sessionSecret) throw new Error("SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const getSession = (request: Request) =>
  sessionStorage.getSession(request.headers.get("Cookie"));
