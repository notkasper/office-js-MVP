import { observable, action } from "mobx";
import jsCookie from "js-cookie";
import { testApi as testApiService } from "../services/application";
import { oauth as oauthService } from "../services/application";

class Store {
  @action getAccesstoken = () => {
    return jsCookie.get("access_token");
  };

  @action getRefreshToken = () => {
    return jsCookie.get("refresh_token");
  };

  @action checkAuthorized = () => {
    return this.getAccesstoken() && this.getRefreshToken();
  };

  @action listenToCookieChanges = (callback = () => {}) => {
    const accessToken = this.getAccesstoken();
    const refreshToken = this.getRefreshToken();
    var interval = setInterval(() => {
      const newAccessToken = this.getAccesstoken();
      const newRefreshToken = this.getRefreshToken();
      if (accessToken !== newAccessToken || refreshToken !== newRefreshToken) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  };

  @action testApi = (callback = () => {}) => {
    testApiService(callback);
  };

  @action authorize = (callback = () => {}) => {
    oauthService((error, response) => {
      callback(error, response);
      if (error) {
        console.error(`Error while authorizing: ${error}`);
        return;
      }
      const {
        body: { url }
      } = response;
      Office.context.ui.displayDialogAsync(
        url,
        {
          width: 50,
          height: 50,
          displayInIframe: false,
          promptBeforeOpen: false
        },
        result => {
          if (result.status !== "succeeded") {
            console.error(
              `Something went wrong while opening the dialog: ${JSON.stringify(
                result
              )}`
            );
          }
          const dialog = result.value;
          dialog.addEventHandler(
            Office.EventType.DialogMessageReceived,
            message => {
              console.error(`something: ${JSON > stringify(message)}`);
            }
          );
        }
      );
    });
  };
}

const store = new Store();

export default store;
