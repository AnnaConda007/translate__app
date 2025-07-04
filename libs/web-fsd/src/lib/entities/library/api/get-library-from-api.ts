   import { waitForAuthUser } from "../../../shared/utils/wait-firebase-user";
 


export const getAllTextTitlesFromApi = async (): Promise<string[]> => {
  const user = await waitForAuthUser();  
  const token = await user.getIdToken();

  const result = await fetch("http://localhost:3000/api/get-all-texts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();  
   return data;
};