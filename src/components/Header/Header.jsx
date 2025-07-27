import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { useLocation } from "react-router-dom";

import {
  ConnectionButton,
  DisconnectButton,
  HomeButton,
  TenantMenuButton,
  OwnerMenuButton,
} from "../Buttons/buttons";

export default function Header() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const pathname = location.pathname;

  // Pages publiques
  const publicPages = [
    "/",
    "/Accueil",
    "/Inscription",
    "/Connexion",
    "/Je_donne",
    "/Compte",
  ];

  // Détection du rôle propriétaire
  const isOwner = [
    "/Menu_Proprietaire",
    "/Espace_Proprietaire",
    "/Deposer",
    "/Creation",
  ].includes(pathname);

  const subtitle = isOwner
    ? "Espace Propriétaire"
    : "Vos locations de vacances moins chères";

  // Boutons à afficher en fonction de la route
  let buttonContent = <HomeButton />;

  if (pathname === "/" || pathname === "/Accueil") {
    buttonContent = <ConnectionButton />;
  } else if (pathname === "/Je_donne") {
    buttonContent = <TenantMenuButton />;
  } else if (pathname === "/Menu_Locataire") {
    buttonContent = <DisconnectButton />;
  } else if (
    ["/Messages", "/Contact", "/Favoris", "/Annonces"].includes(pathname)
  ) {
    buttonContent = (
      <>
        <TenantMenuButton />
        <DisconnectButton />
      </>
    );
  } else if (["/Deposer", "/Creation"].includes(pathname)) {
    buttonContent = (
      <>
        <OwnerMenuButton />
        <DisconnectButton />
      </>
    );
  }

  // Avatar visible uniquement si utilisateur connecté et pas sur une page publique
  const showAvatar = !publicPages.includes(pathname) && user && user.avatarUrl;

  return (
    <header>
      <div className="navTitleContainer">
        <h3 className="navTitle">CoolBooking.fr</h3>
        <h4 className="navSubTitle">{subtitle}</h4>
      </div>
      <div className="navButtonContainer">
        {showAvatar && user?.avatarUrl && (
          <div className="avatar">
            <span className="name">{user.name}</span>
            <div className="photo">
              <img
                src={user.avatarUrl}
                alt="Profil"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/download.png";
                }}
              />
            </div>
          </div>
        )}
        <div className="navButtons">{buttonContent}</div>
      </div>
    </header>
  );
}
