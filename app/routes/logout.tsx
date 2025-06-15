import { ActionFunction, redirect } from "@remix-run/node";
import { sessionStorage } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const idToken = session.get("id_token");

  const logoutUrl = new URL("https://nashi.in.authaction.com/oauth2/logout");
  if (idToken) {
    logoutUrl.searchParams.set("id_token_hint", idToken);
  }
  logoutUrl.searchParams.set(
    "post_logout_redirect_uri",
    "https://nashimiya-authaction.vercel.app/after-logout"
  );

  const cookie = await sessionStorage.destroySession(session);

  return redirect(logoutUrl.toString(), {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
