import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <h4 className="footerText">Aidez-nous à garder ce site gratuit</h4>
      <a href="menu_proprietaire.html">
        <Link to="/Je_donne">
          <button className="donationButton">Je donne</button>
        </Link>
      </a>
    </footer>
  );
}
