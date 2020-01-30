export class SignUpForm {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string[];


  constructor(id: number, name: string, username: string, email: string, password: string, avatar: string, role: string[]) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
  }
}
