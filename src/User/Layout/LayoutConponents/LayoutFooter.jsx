import { useState } from "react";
import { Twitter, Linkedin, Facebook, Github, Dribbble } from "lucide-react";

export default function LayoutFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-white text-gray-800 p-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Get notified when we launch
            </h2>
            <p className="text-gray-600">
              Stay up to date with the latest news, announcements, and articles.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 border border-none bg-slate-200 "
              required
            />
            <button
              type="submit"
              className="bg-black text-xs  hover:bg-gray-800 text-white px-4 py-2 "
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Logo and Tagline */}
          <div className="md:w-1/4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-gray-800 rounded-full"></div>
              <span className="font-bold">Untitled UI</span>
            </div>
            <p className="text-gray-600">
              Design amazing digital experiences that create more happy in the
              world.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:w-3/4">
            {/* Product Column */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Features
                  </a>
                </li>
                <li className="flex items-center gap-1">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Solutions
                  </a>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    New
                  </span>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Releases
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Media kit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Help centre
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    AngelList
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Dribbble
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Licenses
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-gray-200">
          <p className="text-gray-600 mb-4 md:mb-0">
            © 2077 Untitled UI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Twitter
              size={20}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            />
            <Linkedin
              size={20}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            />
            <Facebook
              size={20}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            />
            <Github
              size={20}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            />
            <Dribbble
              size={20}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
