import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class ProfileService {


  async getProfileById(profileId) {
    const res = await api.get('api/profiles/' + profileId)

    AppState.activeProfile = new Account(res.data)
  }



 async getProfile(profileId){
  try {
    const res = await api.get('api/profiles/' + profileId)
    AppState.activeProfile = new Account(res.data)
    logger.log('new active profile', AppState.activeProfile)
  } catch (error) {
    logger.log(error)
  }
 }
 async getProfileSamples(profileId){
  const res = await api.get(`api/profiles/${profileId}/samples`);
  AppState.profileSamples = res.data
  logger.log('[profile samples]', AppState.profileSamples)
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