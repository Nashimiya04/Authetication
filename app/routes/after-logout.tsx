export default function AfterLogout() {
  return (
    <div className="p-8 font-sans text-center">
      <h1 className="text-3xl font-semibold mb-4 text-green-600">
        You have logged out successfully.
      </h1>
      <p className="text-gray-700">
        Thank you for visiting.{" "}
        <a href="/" className="text-blue-500 hover:underline">
          Return to homepage
        </a>
      </p>
    </div>
  );
}
