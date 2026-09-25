import React from "react";
import Image from "next/image";
import {
  LogoLinkedin,
  LogoFacebook,
  LogoGithub,
} from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="w-full px-4 py-6 lg:px-10 xl:px-16">

        {/* Main Footer */}
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:justify-between">

          {/* Logo - Left */}
          <div className="lg:w-1/3">
            <Image
              src="/logo.png"
              alt="Job Platform"
              width={140}
              height={40}
              className="h-auto w-auto"
            />

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600 dark:text-gray-400">
              Discover the right opportunities, explore companies, and build
              your career with the right tools.
            </p>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:w-2/3 lg:grid-cols-3 lg:justify-items-end">

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Products
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Job Discovery
                  </a>
                </li>

                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Worker AI
                  </a>
                </li>

                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Companies
                  </a>
                </li>

                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Salary Data
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Navigation
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Help Center
                  </a>
                </li>

                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Career Library
                  </a>
                </li>

                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Resources
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Brand Guidelines
                  </a>
                </li>

                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                    Newsroom
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Job Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn">
              <LogoLinkedin className="size-5 text-gray-500 hover:text-blue-600" />
            </a>

            <a href="#" aria-label="Facebook">
              <LogoFacebook className="size-5 text-gray-500 hover:text-blue-600" />
            </a>

            <a href="#" aria-label="X">
              <LogoGithub className="size-5 text-gray-500 hover:text-blue-600" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;