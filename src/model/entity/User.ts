export class User {
  constructor(private username: string, private password: string) {
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

  setUsername(username: string){
    this.username = username;
  }

  setPassword( password: string){
    this.password = password;
  }
}
