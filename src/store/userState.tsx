import {observable, action, toJS} from 'mobx';
import {apiGetUser, apiLogout, apiSocialRegister, apiUpdateUser} from "../actions/user";
import {IUser} from "../interfaces/i_user";

type ILogIn = (user: IUser) => void

class UserState {
  @observable user: IUser | null = null;

  @action getUser = async (fcm?: string): Promise<IUser> => {
    try {
      const user = await apiGetUser();
      if (fcm && user.fcm !== fcm) await this.updateUser({fcm});
      else this.user = user;
      return user;
    } catch (e) {
      throw e;
    }
  };
  @action updateUser = async (data: IUser): Promise<IUser> => {
    try {
      this.user = {...toJS(this.user), ...data};
      let user = await apiUpdateUser(data);
      this.user = user;
      return user;
    } catch (e) {
      throw e;
    }
  };
  @action logIn: ILogIn = async (user) => {
    try {
      this.user = await apiSocialRegister(user);
    } catch (e) {
      throw e;
    }
  };

  @action logOut = async () => {
    try {
      this.user = await apiLogout();
    } catch (e) {
      throw e;
    }
  };
}

export const userState = new UserState();

