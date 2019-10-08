import { observable, action } from "mobx";
import jsCookie from "js-cookie";
import {
  testApi as testApiService,
  oauth as oauthService,
  getUserDetails as getUserDetailsService,
  getProfiles as getProfilesService
} from "../services/application";

class AddonStore {
  @observable profile = null;
  @observable profiles = [];

  @action getAccesstoken = () => {
    return jsCookie.get("accessToken");
  };

  @action getRefreshToken = () => {
    return jsCookie.get("refreshToken");
  };

  @action checkAuthorized = () => {
    return this.getAccesstoken() || this.getRefreshToken();
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

  @action getProfiles = (callback = () => {}) => {
    getProfilesService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.profiles = response.body;
      console.log(`Retrieved profiles: ${JSON.stringify(this.profiles)}`);
      callback();
    });
  };

  @action getUserDetails = (callback = () => {}) => {
    getUserDetailsService((error, response) => {
      if (error) {
        console.error(error);
        callback(error, response);
        return;
      }
      this.profile = response.body;
      console.log(`Retrieved profile: ${JSON.stringify(this.profile)}`);
    });
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

const addonStore = new AddonStore();

export default addonStore;
