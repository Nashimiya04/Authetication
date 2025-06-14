import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator
    .authenticate("authaction", request)
    .then((user) => {
      console.log("Authenticated user Dashboard:", user);
      return user;
    })
    .catch(() => null);
  if (!user) {
    return redirect("/login");
  }
  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-700 mb-1">
          Hello, <span className="font-semibold">{user.name}</span>
        </p>
        <p className="text-gray-600 mb-4">
          Your email is: <span className="font-medium">{user.email}</span>
        </p>

        {/* Logout Button */}
        <form action="/logout" method="post">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-150"
          >
            Logout
          </button>
        </form>

        {/* Session Debug Info */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Session Debug Info
          </h2>

          {/* Status */}
          <p className="mb-4 text-sm text-green-700 bg-green-100 inline-block px-3 py-1 rounded-full">
            ✅ Authenticated
          </p>
{/* 
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-1">
              User Info
            </h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap break-words text-left">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-1">
              Access Token
            </h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap break-words text-left">
              {user.accessToken || "N/A"}
            </pre>
          </div> */}
        </div>
      </div>
    </div>
  );
}
