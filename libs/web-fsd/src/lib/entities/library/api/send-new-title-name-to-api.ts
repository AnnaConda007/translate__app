   import { waitForAuthUser } from "../../../shared/utils/wait-firebase-user";
 


export const sendNewTitleToApi = async ({title,newTitle}): Promise<void> => {
  const user = await waitForAuthUser();  
  const token = await user.getIdToken();
console.log(title,newTitle)
   await fetch("http://localhost:3000/api/rename-text-in-library", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify({ title,newTitle }),

  });
 
};