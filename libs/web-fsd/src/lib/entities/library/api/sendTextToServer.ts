 import { auth } from "../../../shared/config/firebase-сonfig";
 
export const sendTextToServer = async (title: string, content: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  await fetch("http://localhost:3000/api/add-text-to-library", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
};
