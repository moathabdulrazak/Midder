
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { storage, fbAuth } from "../utils/FirebaseProvider.js"
import { fb } from "../utils/FirebaseProvider.js"
import { api } from "./AxiosService.js"

class FirebaseService {
  async login() {
    try {
      const res = await api.get('account/firebase')
      logger.log(res.data)
      const token = res.data.token
      await fbAuth.signInWithCustomToken(token)
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }
 async uploadSample(samples){
  const collection = storage.ref('samples')
  const resource  = collection.child(samples.name)
  const snapshot = await resource.put(samples, {
    customMetadata: {
      uid: AppState.account.id, size: samples.size, type: 'samples'
    },
    headers: {
      'X-Goog-Upload-Command': 'upload, finalize'
    }
  })
  const sampleUrl = await snapshot.ref.getDownloadURL()
  return sampleUrl
 }
}

export const firebaseService = new FirebaseService()