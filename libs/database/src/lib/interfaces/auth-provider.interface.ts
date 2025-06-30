export interface IAuthProvider {
  addNewUser(userId: string, email: string, name: string): Promise<any>;
}
