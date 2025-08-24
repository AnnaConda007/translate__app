import { auth } from '../../../shared/config/firebase-сonfig';

export const createTablesForUser = async (email: string, name: string) => {
  const user = auth.currentUser;
  if (!user) return;
  const token = await user.getIdToken();
  fetch('http://localhost:3000/api/create-new-user-table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, name }),
  });
};
