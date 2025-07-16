import { useLocation } from "react-router-dom";
import {
  ConnectionButton,
  DisconnectButton,
  HomeButton,
  TenantMenuButton,
  OwnerMenuButton,
} from "../Buttons/buttons";

export default function Header() {
  const location = useLocation();
  const isDefaultPage = location.pathname === "/";
  const isHomePage = location.pathname === "/Accueil";
  const isInscriptionPage = location.pathname === "/Inscription";
  const isConnectionPage = location.pathname === "/Connexion";
  const isDonationPage = location.pathname === "/Je_donne";
  const isAccountPage = location.pathname === "/Compte";
  const isMessagesPage = location.pathname === "/Messages";
  const isContactPage = location.pathname === "/Contact";
  const isFavoritesPage = location.pathname === "/Favoris";
  const isAdPage = location.pathname === "/Annonces";
  const isTenantMenuPage = location.pathname === "/Menu_Locataire";
  const isAddAdPage = location.pathname === "/Deposer";
  const isAdCreationPage = location.pathname === "/Creation";

  const isOwner =
    location.pathname === "/Menu_Proprietaire" ||
    location.pathname === "/Espace_Proprietaire" ||
    location.pathname === "/Deposer" ||
    location.pathname === "/Creation";

  const subtitle = isOwner
    ? "Espace Propriétaire"
    : "Vos locations de vacances moins chères";

  let buttonContent = null;

  if (isDefaultPage) {
    buttonContent = <ConnectionButton />;
  } else if (isHomePage) {
    buttonContent = <ConnectionButton />;
  } else if (isDonationPage) {
    buttonContent = <TenantMenuButton />;
  } else if (isTenantMenuPage) {
    buttonContent = <DisconnectButton />;
  } else if (isMessagesPage || isContactPage || isFavoritesPage || isAdPage) {
    buttonContent = (
      <>
        <TenantMenuButton />
        <DisconnectButton />
      </>
    );
  } else if (isAddAdPage || isAdCreationPage) {
    buttonContent = (
      <>
        <OwnerMenuButton />
        <DisconnectButton />
      </>
    );
  } else buttonContent = <HomeButton />;

  return (
    <header>
      <div className="navTitleContainer">
        <h3 className="navTitle">CoolBooking.fr</h3>
        <h4 className="navSubTitle">{subtitle}</h4>
      </div>
      <div className="navButtonContainer">
        {!isDefaultPage &&
          !isHomePage &&
          !isInscriptionPage &&
          !isConnectionPage &&
          !isDonationPage &&
          !isAccountPage && (
            <div className="avatar">
              <span className="name">Alexandre</span>
              <div className="photo">
                <img
                  src="https://res.cloudinary.com/dwkyezu2u/image/upload/v1744473288/photo_compte_gm5cwd.jpg"
                  alt=""
                />
              </div>
            </div>
          )}
        <div className="navButtons">{buttonContent}</div>
      </div>
    </header>
  );
}
