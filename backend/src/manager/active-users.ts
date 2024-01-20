export class ActiveUsers {
  private static instance: ActiveUsers;

  private constructor() {}

  public static getInstance(): ActiveUsers {
    if (!ActiveUsers.instance) {
      ActiveUsers.instance = new ActiveUsers();
    }
    return ActiveUsers.instance;
  }
}
