   import { waitForAuthUser } from "../../../shared/utils/wait-firebase-user";
 


export const getTextByTitleFromApi = async (title: string): Promise<string> => {
  const user = await waitForAuthUser();  
  const token = await user.getIdToken();

  const response = await fetch(`http://localhost:3000/api/get-text-by-title?title=${encodeURIComponent(title)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Ошибка ${response.status}: ${error}`);
  }

  return await response.text(); 
};
