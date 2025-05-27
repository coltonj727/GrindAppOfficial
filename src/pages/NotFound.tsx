import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-300 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8">The hunting ground you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto">
            <Home className="w-5 h-5" />
            <span>Return to Base Camp</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
