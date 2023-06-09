
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

  async uploadSong(media) {
    const collection = storage.ref('Media')
    const resource = collection.child(media.name)
    const snapshot = await resource.put(media, {
      customMetadata: {
        uid: AppState.account.id, size: media.size, type: 'Media'
      }
    })
    const url = await snapshot.ref.getDownloadURL()
    return url
  }

  async uploadImage(media) {
    const collection = storage.ref('Media')
    const resource = collection.child(media.name)
    const snapshot = await resource.put(media, {
      customMetadata: {
        uid: AppState.account.id, size: media.size, type: 'Media'
      }
    })
    const url = await snapshot.ref.getDownloadURL()
    return url
  }
  
}

export const firebaseService = new FirebaseService()