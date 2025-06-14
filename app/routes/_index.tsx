import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator
    .authenticate("authaction", request)
    .catch(() => null);
  if (!user) {
    return json({ user: null });
  }
  return json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          {!user ? (
            <>
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

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Please log in to continue.
              </p>

              <Link
                to="/login"
                className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome back, <span className="font-bold">{user.name}</span>
              </h2>
              <p className="text-sm text-gray-500 mb-6">{user.email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
