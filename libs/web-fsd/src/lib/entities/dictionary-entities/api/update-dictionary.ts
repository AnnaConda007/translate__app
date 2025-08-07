 import { auth } from "../../../shared/config/firebase-сonfig";
import { ITestResult } from "../../test-entities/model/types";
 
export const updateProgressInDictionary
 = async (results:ITestResult[]) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
   await fetch("http://localhost:3000/api/update-dictionary-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
 body: JSON.stringify(results),  });
};
