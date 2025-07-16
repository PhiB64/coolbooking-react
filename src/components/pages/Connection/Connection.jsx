import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Connection() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRole(value);
    } else {
      setRole("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "Locataire") {
      navigate("/Menu_Locataire");
    } else if (role === "Propriétaire") {
      navigate("/Menu_Proprietaire");
    } else {
      alert("Veuillez sélectionner un rôle");
    }
  };

  return (
    <section className="mainContent">
      <div id="connectionContent">
        <div className="firstContainer">
          <h2 className="connectionTitle">Connexion</h2>
        </div>

        <div className="secondContainer">
          <div className="checkboxes">
            <div className="checkbox">
              <label htmlFor="Propriétaire">Propriétaire</label>
              <input
                type="checkbox"
                id="Propriétaire"
                name="role"
                value="Propriétaire"
                checked={role === "Propriétaire"}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="Locataire">Locataire</label>
              <input
                type="checkbox"
                id="Locataire"
                name="role"
                value="Locataire"
                checked={role === "Locataire"}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>

          <form className="registrationForm" onSubmit={handleSubmit}>
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
            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
    </section>
  );
}
