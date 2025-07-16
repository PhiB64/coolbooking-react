import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="mainContent">
      <div id="homeContent">
        <div className="firstMainContainer">
          <h1 className="webSiteName">CoolBooking.fr</h1>
          <h2 className="firstDescription">
            Votre plateforme de mise
            <br />
            en relation directe et gratuite
          </h2>
        </div>
        <div className="secondMainContainer">
          <h2 className="secondDescription">
            Des annonces sans frais pour les propriétaires
            <br />
            Des locations moins chères pour les vacanciers
          </h2>
          <Link to="/Inscription">
            <button className="inscriptionButton">
              Inscrivez-vous pour commencer !
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
