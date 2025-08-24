import { waitForAuthUser } from '../../../shared/utils/wait-firebase-user';
import { IDictionary } from '../model/stor';

export const getDictionaryFromApi = async (): Promise<IDictionary[]> => {
  const user = await waitForAuthUser();
  const token = await user.getIdToken();

  const result = await fetch('http://localhost:3000/api/get-dictionary', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};
