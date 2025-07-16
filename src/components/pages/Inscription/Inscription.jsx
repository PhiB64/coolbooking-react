import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Inscription() {
  const [imageSrc, setImageSrc] = useState("/src/assets/download.png");
  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ici tu peux ajouter une validation personnalisée
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmpassword.value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Traitement des données (ex: appel API) ici...

    // Redirection vers la page "Compte"
    navigate("/Compte");
  };

  return (
    <section className="mainContent">
      <div id="inscriptionContent">
        <div className="leftContainer">
          <h2 className="accountCreationTitle">Je crée mon compte</h2>
          <br />
          <div className="imageUpload">
            <img
              id="profileImage"
              src={imageSrc}
              alt="Profil"
              onClick={() => document.getElementById("newImage").click()}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              id="newImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <p>Insérez une photo</p>
        </div>

        <div className="rightContainer">
          <div className="checkboxes">
            <div className="checkbox">
              <label htmlFor="Propriétaire">Propriétaire</label>
              <input
                type="checkbox"
                id="Propriétaire"
                name="role"
                value="Propriétaire"
              />
            </div>
            <div className="checkbox">
              <label htmlFor="Locataire">Locataire</label>
              <input
                type="checkbox"
                id="Locataire"
                name="role"
                value="Locataire"
              />
            </div>
          </div>

          <form className="registrationForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Nom"
              required
            />
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Prénom"
              required
            />
            <input
              type="tel"
              id="telephone"
              name="telephone"
              placeholder="Téléphone"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              required
            />
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Vérification du mot de passe"
              required
            />
            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
    </section>
  );
}
