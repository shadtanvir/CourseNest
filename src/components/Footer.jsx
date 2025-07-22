import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/course-nest-logo.png";
const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content font-inter px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1  md:grid-cols-3 gap-10 md:gap-40">
        {/* Column 1: Logo & Slogan */}
        <div>
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-16 h-10" />
            <h2 className="text-2xl font-bold font-poppins text-primary">
              CourseNest
            </h2>
          </div>
          <p className="mt-2 text-sm text-secondary">
            Empowering learners through quality and accessible education.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-poppins font-semibold mb-3 text-base-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-accent transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-accent transition">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/add-course" className="hover:text-accent transition">
                Add Course
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-poppins font-semibold mb-3 text-base-300">
            Contact Us
          </h3>
          <div className="flex space-x-3 mt-4">
            <a
              href="https://www.facebook.com/tahmedshad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-primary hover:text-accent transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/tanvir70469110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-primary hover:text-accent transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/tanvirshad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-primary hover:text-accent transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/shadtanvir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-primary hover:text-accent transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-secondary border-t border-base-300 pt-4">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold text-primary">CourseNest</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
