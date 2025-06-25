export interface IAuthProvider {
  auth( ): Promise<any>;
}
