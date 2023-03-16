import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"





class SampleService {
  async getAllSamples() {
    const samples = await dbContext.Sample.find()
    logger.log("all samples", samples)
    return samples
  }
  async createSample(sampleData) {
    const sample = await (await dbContext.Sample.create(sampleData))
    logger.log("created a sample")
    return sample
  }


}






export const sampleService = new SampleService()