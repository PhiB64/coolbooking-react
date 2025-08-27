import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Connection() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userData = await response.json();
      console.log("Connexion réussie :", userData);

      const role = userData.role;
      console.log("role:", role);

      const newUser = {
        name: userData.firstname,
        role: role,
        avatarUrl: userData.avatar || "/default-avatar.png",
      };
      console.log("Avatar:", userData.avatar);

      // Enregistrement dans le contexte et dans le localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      // Redirection selon le rôle
      if (role === "owner") {
        navigate("/Menu_Proprietaire");
      } else if (role === "tenant") {
        navigate("/Menu_Locataire");
      } else if (role === "owner_tenant") {
        navigate("/Menu_Proprietaire");
      } else {
        alert("Rôle inconnu — redirection impossible.");
      }
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <section className="mainContent">
      <div id="connectionContent">
        <div className="firstContainer">
          <h2 className="connectionTitle">Connexion</h2>
        </div>

        <div className="secondContainer">
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
