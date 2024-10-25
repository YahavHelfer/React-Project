import { Footer as FbFooter } from "flowbite-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <FbFooter
      container
      className="rounded-none bg-slate-800" 
      style={{
        position: "relative",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 0",
        backgroundColor: "#1e293b", 
        zIndex: 1000, 
      }}
    >
      <div className="flex items-center justify-between w-full px-4">
        <FbFooter.Copyright
          href="#"
          by="Yahav Helfer"
          year={2024}
          className="text-slate-100"
          style={{ color: "#e2e8f0" }} 
        />
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="text-slate-100 hover:text-slate-300">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Twitter" className="text-slate-100 hover:text-slate-300">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="text-slate-100 hover:text-slate-300">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-slate-100 hover:text-slate-300">
            <FaLinkedin />
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="/privacy-policy" className="text-slate-100 hover:text-slate-300">Privacy Policy</a>
          <a href="/terms-of-use" className="text-slate-100 hover:text-slate-300">Terms of Use</a>
        </div>
      </div>
    </FbFooter>
  );
};

export default Footer;

