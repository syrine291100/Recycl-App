// Calcule le niveau selon le score
export const getLevel = (score) => {
  if (score >= 25) return "Champion du recyclage 🏆";
  if (score >= 10) return "Ambassadeur local 🌍";
  return "Débutant du tri ♻️";
};

// Formatte une date pour l’historique
export const formatDate = (isoString) => {
  const d = new Date(isoString);
  return `${d.getDate().toString().padStart(2, '0')}/${
    (d.getMonth() + 1).toString().padStart(2, '0')}/${
    d.getFullYear()} à ${d.getHours()}h${d.getMinutes().toString().padStart(2, '0')}`;
};
