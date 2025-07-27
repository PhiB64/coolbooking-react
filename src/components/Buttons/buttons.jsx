import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

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
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/Accueil");
  };

  return (
    <button className="navButton" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
