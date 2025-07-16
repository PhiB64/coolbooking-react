import { Link } from "react-router-dom";

export default function OwnerMenu() {
  return (
    <section className="mainContent">
      <div id="ownerMenuContent">
        <ul>
          <Link to="/Compte">
            <span className="link">
              <h2>Mon compte</h2>
            </span>
          </Link>
          <Link to="/Deposer">
            <span className="link">
              <h2>Déposer une annonce</h2>
            </span>
          </Link>
          <Link to="/Annonces">
            <span className="link">
              <h2>Mes annonces</h2>
            </span>
          </Link>
          <Link to="/Messages">
            <span className="link">
              <h2>Mes messages</h2>
            </span>
          </Link>
          <Link to="/Contact">
            <span className="link">
              <h2>Nous contacter</h2>
            </span>
          </Link>
        </ul>
      </div>
    </section>
  );
}
