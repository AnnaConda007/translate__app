 import { auth } from "../../../shared/config/firebase-сonfig";
 
export const sendTextToApi = async (text: string) : Promise<string> => {
   const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
console.log(text)
  const token = await user.getIdToken();

  const result = await fetch("http://localhost:3000/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
const data = await result.text(); 
  return data;
};
