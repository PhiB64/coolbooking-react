import { Link } from "react-router-dom";

export default function AddAd() {
  return (
    <section className="mainContent">
      <div id="addAdContent">
        <div className="addAdContainer">
          <h2 className="addAdDescription">
            Des annonces gratuites
            <br />
            sans commissions ni frais cachés
          </h2>
          <Link to="/Creation">
            <button className="addAdButton">
              Je dépose gratuitement une annonce
              <span id="plus"> + </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
