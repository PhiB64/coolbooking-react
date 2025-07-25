import { useNavigate } from "react-router-dom";

export default function Connection() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userData = await response.json();
      console.log("Connexion réussie :", userData);

      const role = userData.role;

      // ✅ Redirection selon le rôle
      if (Array.isArray(role)) {
        if (role.includes("owner") && role.includes("tenant")) {
          navigate("/Menu_Proprietaire"); // ou une vue combinée
        } else if (role.includes("owner")) {
          navigate("/Menu_Proprietaire");
        } else if (role.includes("tenant")) {
          navigate("/Menu_Locataire");
        } else {
          alert("Rôle inconnu — redirection impossible.");
        }
      } else {
        // Si role est une string
        if (role === "owner") {
          navigate("/Menu_Proprietaire");
        } else if (role === "tenant") {
          navigate("/Menu_Locataire");
        } else {
          alert("Rôle inconnu — redirection impossible.");
        }
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
