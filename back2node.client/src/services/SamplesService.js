import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class SampleService{


  async getAllSamples(){
    const res = await api.get('api/samples')
    logger.log(res.data, "[ All Samples]")
    AppState.samples = res.data
  }
}






export const sampleService = new SampleService();