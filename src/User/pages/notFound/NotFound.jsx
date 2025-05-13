import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-[100vw] Hide-Scrollbar h-[100vh] bg-gray-900 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Glitch effect for 404 */}
        <div className="relative text-white font-bold">
          <div className="text-9xl tracking-tighter font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            404
          </div>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-white">Page not found</h2>
        <p className="mt-4 text-gray-300">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>

        {/* Buttons with better styling */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 rounded-lg text-base font-medium text-gray-200 hover:text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="relative mt-16 w-full max-w-lg">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        {/* Code effect box */}
        <div className="relative">
          <div className="p-6 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs text-gray-400 font-mono">
                404_error.js
              </div>
            </div>
            <div className="font-mono text-left text-sm">
              <p className="text-gray-400">
                <span className="text-blue-400">const</span>
                <span className="text-green-400"> page</span>
                <span className="text-gray-300"> = </span>
                <span className="text-purple-400">findPage</span>
                <span className="text-gray-300">(</span>
                <span className="text-amber-300">'requested_url'</span>
                <span className="text-gray-300">);</span>
              </p>
              <p className="text-red-400 mt-2">
                Error: page not found in database
              </p>
              <p className="text-gray-400 mt-2">
                <span className="text-blue-400">function</span>
                <span className="text-purple-400"> redirect</span>
                <span className="text-gray-300">() {`{`}</span>
              </p>
              <p className="text-gray-400 ml-4">
                <span className="text-green-400">return</span>
                <span className="text-amber-300"> '/home'</span>
                <span className="text-gray-300">;</span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-300">{`}`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom style for animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
