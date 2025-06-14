import { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const user = authenticator.authenticate("authaction", request);
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }
  console.log("Authenticated user login:", user);
  return user;
};

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">Login to continue</p>

        <form method="post">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150"
          >
            Login with AuthAction
          </button>
        </form>
      </div>
    </main>
  );
}
