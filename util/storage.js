import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'recyclapp:users';
const HISTORY_KEY = 'recyclapp:history';

const normalizeUsername = (username) => username.trim().toLowerCase();

export const getUsers = async () => {
  const json = await AsyncStorage.getItem(USERS_KEY);
  return json ? JSON.parse(json) : [];
};

export const addUser = async (username, password) => {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername || password.length < 4) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const users = await getUsers();
  if (users.some((user) => user.username === normalizedUsername)) {
    throw new Error('USERNAME_EXISTS');
  }

  const newUser = {
    username: normalizedUsername,
    password,
    score: 0,
    level: 'Débutant du tri ♻️',
  };

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};

export const checkUser = async (username, password) => {
  const normalizedUsername = normalizeUsername(username);
  const users = await getUsers();
  return users.find(
    (user) => user.username === normalizedUsername && user.password === password,
  );
};

export const updateUserScore = async (username, points) => {
  const normalizedUsername = normalizeUsername(username);
  const users = await getUsers();
  const index = users.findIndex((user) => user.username === normalizedUsername);

  if (index === -1) return null;

  const score = Math.max(0, users[index].score + points);
  users[index] = {
    ...users[index],
    score,
    level:
      score >= 25
        ? 'Champion du recyclage 🏆'
        : score >= 10
          ? 'Ambassadeur local 🌍'
          : 'Débutant du tri ♻️',
  };

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users[index];
};

export const getUser = async (username) => {
  const normalizedUsername = normalizeUsername(username);
  const users = await getUsers();
  return users.find((user) => user.username === normalizedUsername) ?? null;
};

export const getRanking = async () => {
  const users = await getUsers();
  return [...users].sort((a, b) => b.score - a.score);
};

export const addHistoryEntry = async (username, entry) => {
  const normalizedUsername = normalizeUsername(username);
  const json = await AsyncStorage.getItem(HISTORY_KEY);
  const history = json ? JSON.parse(json) : {};
  const userHistory = history[normalizedUsername] ?? [];

  history[normalizedUsername] = [
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      ...entry,
    },
    ...userHistory,
  ].slice(0, 50);

  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = async (username) => {
  const normalizedUsername = normalizeUsername(username);
  const json = await AsyncStorage.getItem(HISTORY_KEY);
  const history = json ? JSON.parse(json) : {};
  return history[normalizedUsername] ?? [];
};
