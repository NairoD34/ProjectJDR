import { useEffect, useState } from "react";
import styles from "./heroesBanner.module.css";

export default function HeroesBanner({ campain }) {
  const [isOpen, setIsOpen] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [currentPvs, setCurrentPvs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!campain?.id) return;

    const fetchHeroes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/arena/campain/${campain.id}/heroes`);
        if (!res.ok) throw new Error("Erreur lors du chargement des héros.");
        const data = await res.json();
        setHeroes(data);

        // Initialise les PV courants avec la valeur max
        const initialPvs = {};
        data.forEach((hero) => {
          initialPvs[hero.id] = hero.pv;
        });
        setCurrentPvs(initialPvs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroes();
  }, [campain]);

  const handlePvChange = (id, value, max) => {
    const numericValue = Math.max(0, Math.min(Number(value), max));
    setCurrentPvs((prev) => ({ ...prev, [id]: numericValue }));
  };

  return (
    <>
      <div className={`${styles.banner} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          {!campain ? (
            <p>Chargement de la campagne...</p>
          ) : isLoading ? (
            <p>Chargement des héros...</p>
          ) : error ? (
            <p>{error}</p>
          ) : heroes.length > 0 ? (
            heroes.map((hero) => (
              <div key={hero.id} className={styles.heroCard}>
                <img
                  src={`https://project-jdr-bucket.s3.eu-west-3.amazonaws.com/heroes/${hero.filename}`}
                  alt={hero.title}
                />
                <div>
                  <p>Nom : {hero.title}</p>
                  <p>Niveau : {hero.lvl}</p>
                  <p>
                    PV :{" "}
                    <input
                      type="number"
                      value={currentPvs[hero.id] || 0}
                      min={0}
                      max={hero.pv}
                      onChange={(e) =>
                        handlePvChange(hero.id, e.target.value, hero.pv)
                      }
                    />{" "}
                    / {hero.pv}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun héros trouvé.</p>
          )}
        </div>
      </div>

      <button className={styles.toggleButton} onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? " → " : "← "}
      </button>
    </>
  );
}
