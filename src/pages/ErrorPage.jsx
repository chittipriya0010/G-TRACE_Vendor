export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">Something went wrong.</p>
      <p className="text-sm text-gray-500">The page you’re looking for does not exist.</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-900"
      >
        Go Home
      </a>
    </div>
  );
}
