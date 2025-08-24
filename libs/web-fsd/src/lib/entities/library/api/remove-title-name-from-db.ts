import { waitForAuthUser } from '../../../shared/utils/wait-firebase-user';

export const removeTitleFromDb = async ({
  title,
}: {
  title: string;
}): Promise<void> => {
  const user = await waitForAuthUser();
  const token = await user.getIdToken();
  await fetch('http://localhost:3000/api/remove-text-from-user-library', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
};
