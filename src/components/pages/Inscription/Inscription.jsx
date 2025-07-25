import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Inscription() {
  const [imageSrc, setImageSrc] = useState("/src/assets/download.png");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result); // Preview seulement
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      navigate("/Compte");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
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
          </div>
          <p>Insérez une photo</p>
        </div>

        <div className="rightContainer">
          <form
            className="registrationForm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="file"
              id="newImage"
              name="avatar" // ✅ pour Multer côté back
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <div className="checkboxes">
              <div className="checkbox">
                <label htmlFor="Propriétaire">Propriétaire</label>
                <input
                  type="checkbox"
                  id="Propriétaire"
                  name="role"
                  value="owner"
                />
              </div>
              <div className="checkbox">
                <label htmlFor="Locataire">Locataire</label>
                <input
                  type="checkbox"
                  id="Locataire"
                  name="role"
                  value="tenant"
                />
              </div>
            </div>

            <input type="text" name="name" placeholder="Nom" required />
            <input type="text" name="firstname" placeholder="Prénom" required />
            <input type="tel" name="phone" placeholder="Téléphone" required />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
            />
            <input
              type="password"
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
