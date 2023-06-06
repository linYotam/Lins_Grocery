import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid grid--footer">
        <div className="logo-col">
          <a href="/" className="footer-logo">
            <img
              className="logo"
              alt="Omnifood logo"
              src="/images/LinsGrocery.png"
            />
          </a>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Store and services</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                Store locations and hours
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Online shopping
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Gift cards
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                More services
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Customer service</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                My orders
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Manage account
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                FAQs
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Contact us
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">About Lin's Grocery</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                About us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Environment
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Careers
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Privecy and terms
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Get the Lin's Grocery app</p>
          <ul className="footer-nav-links">
            <li>
              <ul className="app-links">
                <li>
                  <img
                    src="/images/app-store-logo.png"
                    alt="apple store app"
                    className="apple-logo"
                    title="Lin's Grocery iOS App"
                  />
                </li>
                <li>
                  <img
                    src="/images/google-play-logo.png"
                    alt="google play app"
                    className="google-logo"
                    title="Lin's Grocery Androind App"
                  />
                </li>
              </ul>
            </li>
            <li>
              <span className="footer-heading">We're social...</span>
            </li>
            <li>
              <ul className="social-links">
                <li>
                  <img
                    src="/images/instagram-icon.png"
                    alt="Instagram link"
                    className="social-icon__instagram"
                    title="Instagram"
                  />
                </li>
                <li>
                  <img
                    src="/images/facebook-icon.png"
                    alt="facebook link"
                    className="social-icon"
                    title="facebook"
                  />
                </li>
                <li>
                  <img
                    src="/images/pinterest-icon.png"
                    alt="pinterest link"
                    className="social-icon"
                    title="pinterest"
                  />
                </li>
                <li>
                  <img
                    src="/images/twitter-icon.png"
                    alt="twitter link"
                    className="social-icon"
                    title="twitter"
                  />
                </li>
                <li>
                  <img
                    src="/images/linkedin-icon.png"
                    alt="linkedin link"
                    className="social-icon"
                    title="linkedin"
                  />
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <p className="copyright">
        Copyright &copy;
        <span className="year">2023</span> by Yotam Lin, Inc. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
