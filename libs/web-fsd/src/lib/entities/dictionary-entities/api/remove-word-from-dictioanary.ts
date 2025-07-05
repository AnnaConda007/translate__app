   import { waitForAuthUser } from "../../../shared/utils/wait-firebase-user";
 


export const removeWordFromDictionary = async ({source}): Promise<void> => {
  const user = await waitForAuthUser();  
  const token = await user.getIdToken();
    await fetch("http://localhost:3000/api/remove-from-dictionary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify({ source }),

  });
 
};