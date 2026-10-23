import { Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/shop', label: 'Shop' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-intro">
          <Link to="/" className="footer-brand">Eyu Online Market</Link>
          <p>Buy, sell and trade musical instruments across Ethiopia.</p>
        </div>

        <div className="footer-section">
          <h2>Quick links</h2>
          <nav className="footer-links" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="footer-section">
          <h2>Get in touch</h2>
          <a href="mailto:Eyuking77@gmail.com">eyuonlinemarket1@gmail.com</a>
          <a href="tel:+25197651880">+2519 176 518 80</a>
          <a href="https://t.me/Eyuonlinemarket1" target="_blank" rel="noopener noreferrer">
            Telegram: @Eyuonlinemarket1
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {currentYear} Eyu Online Market. All rights reserved.</p>
      </div>
    </footer>
  );
}
