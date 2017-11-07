export class User {
  constructor(public id : string , public username: string,public nickname : string, public imageProfile? : string) {
  }

  static  toUserFromJSON(data : string){
    let jsonData = JSON.parse(data);
    var dataToUser : User = new User(jsonData.id ,jsonData.username,jsonData.nickname);
    return dataToUser;
  }

  static  toJSONFromUser(user : User){
    return JSON.stringify(user);
  }

  static  toJSONFromUserFriend(user : User){
    var jsonFriend = { "friend_id" : user.id }
    return JSON.stringify(jsonFriend);
  }
}
