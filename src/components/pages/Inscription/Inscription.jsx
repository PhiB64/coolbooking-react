import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Context/UserContext.jsx";

export default function Inscription() {
  const { setUser } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState("/download.png");
  const [selectedRole, setSelectedRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/users/register`,

        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Réponse backend :", data);

      const newUser = {
        name: formData.get("firstname"),
        role: formData.get("role"),
        avatarUrl: data.avatar,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      navigate("/Compte");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <>
      {showModal && (
        <div className="rolesModal">
          <div className="modalContent">
            <h3>{selectedRole === "owner" ? "Propriétaire" : "Locataire"}</h3>
            <p>
              {selectedRole === "owner"
                ? "En tant que propriétaire, vous devez publier au moins une annonce. Vous pourrez ensuite gérer vos annonces et accéder à votre messagerie dédiée. Vous pourrez également explorer les biens disponibles à la location et prendre contact via la messagerie"
                : "En tant que locataire, vous pouvez explorer les biens disponibles à la location et prendre contact avec les propriétaires via la messagerie"}
            </p>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}

      <section className="mainContent">
        <div id="inscriptionContent">
          <div className="leftContainer">
            <h2 className="accountCreationTitle">Je crée mon compte</h2>
            <div className="imageUpload">
              <button onClick={handleImageClick} id="profileImage">
                <img src={imageSrc} alt="Profil" />
              </button>
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
                ref={fileInputRef}
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <div className="checkRoles">
                <div className="role">
                  <input
                    type="radio"
                    id="Propriétaire"
                    name="role"
                    value="owner"
                    onChange={() => {
                      setSelectedRole("owner");
                      setShowModal(true);
                    }}
                    required
                  />
                  <label htmlFor="Propriétaire">Propriétaire</label>
                </div>
                <div className="role">
                  <input
                    type="radio"
                    id="Locataire"
                    name="role"
                    value="tenant"
                    onChange={() => {
                      setSelectedRole("tenant");
                      setShowModal(true);
                    }}
                  />
                  <label htmlFor="Locataire">Locataire</label>
                </div>
              </div>

              <input type="text" name="name" placeholder="Nom" required />
              <input
                type="text"
                name="firstname"
                placeholder="Prénom"
                required
              />
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
    </>
  );
}
