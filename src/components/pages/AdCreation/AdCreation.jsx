import React, { useState } from "react";

export default function AdCreation() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previews, setPreviews] = useState({});
  const [postalCode, setPostalCode] = useState("");
  const [communes, setCommunes] = useState([]);
  const [locationReady, setLocationReady] = useState(false);

  const handleImagePreview = (e) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handlePostalCodeChange = async (e) => {
    const code = e.target.value;
    setPostalCode(code);
    setCommunes([]);
    setLocationReady(false);

    if (/^\d{5}$/.test(code)) {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_GOUV_LOCATION
          }/communes?codePostal=${code}&fields=nom,codeDepartement,region&format=json`
        );
        const data = await res.json();

        if (data.length > 0) {
          setCommunes(data);
          setLocationReady(true);

          const deptRes = await fetch(
            `${import.meta.env.VITE_GOUV_LOCATION}/departements/${
              data[0].codeDepartement
            }`
          );
          const deptData = await deptRes.json();

          document.querySelector('[name="address.department"]').value =
            deptData.nom;
          document.querySelector('[name="address.region"]').value =
            data[0].region.nom;
        }
      } catch (err) {
        console.error("Erreur localisation :", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("");
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDEND}/rentals/create`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        setFormStatus("Bien créé avec succès !");
        e.target.reset();
        setPreviews({});
        setPostalCode("");
        setCommunes([]);
        setLocationReady(false);
      } else {
        const error = await response.json();
        setFormStatus(`Erreur : ${error.error}`);
      }
    } catch {
      setFormStatus("Erreur réseau ou serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mainContent">
      <div id="adCreationContent">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="firstRentalContainer">
            <h2 id="adCreationTitle">Je créé mon annonce</h2>
            <label htmlFor="rentalName">Nom du logement :</label>
            <input
              type="text"
              id="rentalName"
              name="rentalName"
              maxLength="50"
              required
            />

            <label htmlFor="beds">Nombre de couchages :</label>
            <input type="number" id="beds" name="beds" min="1" required />

            <label htmlFor="postalCode">Code postal :</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={handlePostalCodeChange}
              maxLength="5"
              required
            />
            <input type="hidden" name="address.codePostal" value={postalCode} />

            {locationReady && (
              <>
                <label htmlFor="addressCity">Ville :</label>
                <select id="addressCity" name="address.city" required>
                  <option value="">--Choisir une ville--</option>
                  {communes.map((commune) => (
                    <option key={commune.nom} value={commune.nom}>
                      {commune.nom}
                    </option>
                  ))}
                </select>

                <label htmlFor="addressDepartment">Département :</label>
                <input
                  type="text"
                  id="addressDepartment"
                  name="address.department"
                  maxLength="30"
                  required
                  readOnly
                />

                <label htmlFor="addressRegion">Région :</label>
                <input
                  type="text"
                  id="addressRegion"
                  name="address.region"
                  maxLength="30"
                  required
                  readOnly
                />
              </>
            )}
            <div id="checkboxes">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="petsForbidden"
                  value="true"
                />
                Animaux interdits
              </label>

              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="nonSmoking"
                  value="true"
                />
                Logement non fumeur
              </label>
            </div>
          </div>

          <div className="secondRentalContainer">
            <span>Je clique pour insérer mes photos</span>

            <div className="rentalImages">
              <div className="mainImage">
                <input
                  type="file"
                  id="image_1"
                  name="image_1"
                  accept="image/*"
                  onChange={handleImagePreview}
                  required
                  style={{ display: "none" }}
                />
                <label htmlFor="image_1" className="upload-zone">
                  {previews["image_1"] ? (
                    <img
                      src={previews["image_1"]}
                      alt="Prévisualisation principale"
                      className="preview-img"
                    />
                  ) : (
                    <div className="placeholder">Image principale</div>
                  )}
                </label>
              </div>

              <div className="image-grid">
                {[2, 3, 4, 5].map((i) => (
                  <div key={i} className="secondaryImage">
                    <input
                      type="file"
                      id={`image_${i}`}
                      name={`image_${i}`}
                      accept="image/*"
                      onChange={handleImagePreview}
                      style={{ display: "none" }}
                    />
                    <label htmlFor={`image_${i}`} className="upload-zone">
                      {previews[`image_${i}`] ? (
                        <img
                          src={previews[`image_${i}`]}
                          alt={`Prévisualisation ${i}`}
                          className="preview-img"
                        />
                      ) : (
                        <div className="placeholder">Image {i}</div>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              id="description"
              name="description"
              maxLength="250"
              placeholder="Description"
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Envoi en cours..."
                : "J’enregistre et je passe au calendrier et tarifs"}
            </button>

            {formStatus && <p className="form-status">{formStatus}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
