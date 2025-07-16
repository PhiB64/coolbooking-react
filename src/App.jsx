import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/pages/Home/Home";
import Connection from "./components/pages/Connection/Connection";
import Donation from "./components/pages/Donation/Donation";
import Inscription from "./components/pages/Inscription/Inscription";
import TenantMenu from "./components/pages/TenantMenu/TenantMenu";
import Account from "./components/pages/Account/Account";
import Messages from "./components/pages/Messages/Messages";
import OwnerMenu from "./components/pages/OwnerMenu/OwnerMenu";
import OwnerPage from "./components/pages/OwnerPage/OwnerPage";
import Contact from "./components/pages/Contact/Contact";
import Favorites from "./components/pages/Favorites/Favorites";
import Ad from "./components/pages/Ads/Ads";
import AddAd from "./components/pages/AddAd/AddAd";
import AdCreation from "./components/pages/AdCreation/AdCreation";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Accueil" element={<Home />} />
          <Route path="/Connexion" element={<Connection />} />
          <Route path="/Je_donne" element={<Donation />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Menu_Locataire" element={<TenantMenu />} />
          <Route path="/Menu_Proprietaire" element={<OwnerMenu />} />
          <Route path="/Espace_Proprietaire" element={<OwnerPage />} />
          <Route path="/Compte" element={<Account />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Favoris" element={<Favorites />} />
          <Route path="/Annonces" element={<Ad />} />
          <Route path="/Deposer" element={<AddAd />} />
          <Route path="/Creation" element={<AdCreation />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
