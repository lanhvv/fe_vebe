
export class ChangePasswordRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
  reEnterPassword: string;

  constructor(username: string, oldPassword: string, newPassword: string, reEnterPassword: string) {
      this.username = username,
      this.oldPassword = oldPassword,
      this.newPassword = newPassword,
      this.reEnterPassword = reEnterPassword

  }
}
