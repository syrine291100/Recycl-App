import AsyncStorage from '@react-native-async-storage/async-storage';

// Clé utilisée pour stocker la liste des utilisateurs
const USERS_KEY = 'users';

// Charger tous les utilisateurs
export const getUsers = async () => {
  const json = await AsyncStorage.getItem(USERS_KEY);
  return json ? JSON.parse(json) : [];
};

// Ajouter un utilisateur (attention, pas de vérif duplicat ici)
export const addUser = async (username, password) => {
  const users = await getUsers();
  users.push({ username, password, score: 0, level: "Débutant du tri ♻️" });
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Vérifier login/mot de passe
export const checkUser = async (username, password) => {
  const users = await getUsers();
  return users.find(u => u.username === username && u.password === password);
};

// Mettre à jour le score d’un utilisateur
export const updateUserScore = async (username, points) => {
  const users = await getUsers();
  const i = users.findIndex(u => u.username === username);
  if (i !== -1) {
    users[i].score += points;
    // Met à jour le niveau
    const s = users[i].score;
    users[i].level =
      s >= 25 ? "Champion du recyclage 🏆"
      : s >= 10 ? "Ambassadeur local 🌍"
      : "Débutant du tri ♻️";
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// Obtenir un utilisateur par son nom
export const getUser = async (username) => {
  const users = await getUsers();
  return users.find(u => u.username === username);
};

// Obtenir le classement (décroissant)
export const getRanking = async () => {
  const users = await getUsers();
  return users.sort((a, b) => b.score - a.score);
};
