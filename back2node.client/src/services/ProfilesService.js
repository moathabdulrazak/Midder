import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class ProfileService {


  async getProfileById(profileId) {
    const res = await api.get('api/profiles/' + profileId)

    AppState.activeProfile = new Account(res.data)
  }

  // async search(searchTerm) {


  //   const res = await api.get('api/profiles', { params: searchTerm })
  //   AppState.searchProfiles = res.data
  //   AppState.nextPage = res.data.older
  //   AppState.previousPage = res.data.newer

  //   logger.log("your searching profiles", res.data)
  // }




}




export const profileService = new ProfileService()