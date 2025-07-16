import { Link } from "react-router-dom";

export function HomeButton() {
  return (
    <Link to="/Accueil">
      <button className="navButton">Accueil</button>
    </Link>
  );
}

export function ConnectionButton() {
  return (
    <Link to="/Connexion">
      <button className="navButton">Déjà inscrits, Connectez-vous !</button>
    </Link>
  );
}

export function TenantMenuButton() {
  return (
    <Link to="/Menu_Locataire">
      <button className="navButton">Menu</button>
    </Link>
  );
}

export function OwnerMenuButton() {
  return (
    <Link to="/Menu_Proprietaire">
      <button className="navButton">Menu</button>
    </Link>
  );
}

export function DisconnectButton() {
  return (
    <Link to="/Accueil">
      <button className="navButton">Se déconnecter</button>
    </Link>
  );
}
