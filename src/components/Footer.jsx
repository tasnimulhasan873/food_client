import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-custom text-custom py-12 px-6 font-sans shadow-inner border-t border-accent-custom">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center md:text-left">
        {/* Brand Info / Logo Section */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h2 className="font-extrabold text-3xl mb-4 text-primary-custom">
            Food<span className="text-accent-custom">Share</span>
          </h2>
          <p className="text-custom/80 mb-4 leading-relaxed">
            Connecting communities, reducing waste. Share, request, and enjoy
            surplus food.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-primary-custom text-2xl mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-accent-custom transition-colors duration-300 transform hover:scale-110 rounded-full p-2 bg-accent-custom/10 shadow-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-accent-custom transition-colors duration-300 transform hover:scale-110 rounded-full p-2 bg-accent-custom/10 shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-accent-custom transition-colors duration-300 transform hover:scale-110 rounded-full p-2 bg-accent-custom/10 shadow-md"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-primary-custom inline-block pb-1 text-primary-custom">
            Contact Us
          </h3>
          <p className="mb-2 font-semibold">
            Email:{" "}
            <a
              href="mailto:tasnimul873@gmail.com"
              className="text-accent-custom hover:underline"
            >
              tasnimul873@gmail.com
            </a>
          </p>
          <p className="mb-2 font-semibold">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-accent-custom hover:underline"
            >
              +123 456 7890
            </a>
          </p>
          <p className="italic text-custom/60">Dhaka, Bangladesh</p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-primary-custom inline-block pb-1 text-primary-custom">
            Legal
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-custom hover:text-accent-custom transition-colors duration-300 font-medium"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-custom hover:text-accent-custom transition-colors duration-300 font-medium"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-custom hover:text-accent-custom transition-colors duration-300 font-medium"
              >
                Return Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links / Navigation */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-primary-custom inline-block pb-1 text-primary-custom">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="text-custom hover:text-accent-custom transition-colors duration-300 font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/available-foods"
                className="text-custom hover:text-accent-custom transition-colors duration-300 font-medium"
              >
                Available Foods
              </a>
            </li>

            {/* Add more links as needed, e.g., /manage-foods, /my-requests */}
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-accent-custom pt-8 mt-12 text-center text-sm text-custom/80 font-semibold tracking-wide select-none">
        © {currentYear} Food Sharing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
