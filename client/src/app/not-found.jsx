// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
                <p className="text-gray-500 mt-2 mb-6">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}