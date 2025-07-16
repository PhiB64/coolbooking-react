import { Link } from "react-router-dom";

export default function TenantMenu() {
  return (
    <section className="mainContent">
      <div id="tenantMenuContent">
        <ul>
          <Link to="/Compte">
            <span className="link">
              <h2>Mon compte</h2>
            </span>
          </Link>
          <Link to="/Annonces">
            <span className="link">
              <h2>Les annonces</h2>
            </span>
          </Link>
          <Link to="/Favoris">
            <span className="link">
              <h2>Mes favoris</h2>
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
