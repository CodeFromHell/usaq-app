export class User {
  constructor(public id : string , public username: string,public nickname : string) {
  }

  static  toUserFromJSON(data : string){
    let jsonData = JSON.parse(data);
    var dataToUser : User = new User(jsonData.id ,jsonData.username,jsonData.nickname);
    return dataToUser;
  }

  static  toJSONFromUser(user : User){
    return JSON.stringify(user);
  }
}
