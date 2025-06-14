import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.authenticate("authaction", request);
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }
  console.log("Authenticated user callback:", user);

  return redirect("/dashboard");
};
