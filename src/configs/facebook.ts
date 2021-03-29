import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from "react-native-fbsdk";

export const facebookInit = () => {
  LoginManager.setLoginBehavior('web_only');
};

export const loginFB = async () => {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithPermissions(["public_profile", 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
          reject({message: 'Login cancelled'});
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              if (data) {
                const infoRequest = new GraphRequest(
                  '/me?fields=name,email,picture.type(large)',
                  null,
                  _responseInfoCallback(resolve, reject),
                );
                new GraphRequestManager().addRequest(infoRequest).start();
              }
            }
          )
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
        reject(error);
      }
    );
  });
};

const _responseInfoCallback = (resolve: { (value?: unknown): void; (arg0: any): void; }, reject: { (reason?: any): void; (arg0: any): void; }) => (error: any, result: unknown) => {
  if (error) {
    console.log('Error posting data: ', error);
    reject(error);
  } else {
    resolve(result);
  }
};

export const FBLogout = () => {
  AccessToken.getCurrentAccessToken().then(
    (data) => {
      if (data) {
        let logout = new GraphRequest(
          "me/permissions/",
          {
            accessToken: data.accessToken,
            httpMethod: 'DELETE'
          },
          (error) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
            } else {
              LoginManager.logOut();
            }
          });
        new GraphRequestManager().addRequest(logout).start();
      }
    }
  )
};
