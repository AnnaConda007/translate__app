 import { onAuthStateChanged, User } from "firebase/auth";
 import { auth } from "../config/firebase-сonfig";

export const waitForAuthUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user) resolve(user);
      else reject(new Error("User not authenticated"));
    });
  });
};
