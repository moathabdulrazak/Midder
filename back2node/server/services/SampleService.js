import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"





class SampleService {
  // @ts-ignore
  async updateSample(sampleId, sampleData, userId) {
    const originalSample = await this.getOneSample(sampleId);
    if (!originalSample) {
      throw new BadRequest("Sample not found: " + sampleId);
    }
    if (originalSample.creatorId !== userId) {
      throw new Forbidden("You are not authorized to update this sample");
    }
    originalSample.name = sampleData.name ? sampleData.name : originalSample.key = sampleData.key ? sampleData.key : originalSample.key;
    originalSample.description = sampleData.description ? sampleData.description : originalSample.description;
    originalSample.coverImg = sampleData.coverImg ? sampleData.coverImg : originalSample.coverImg;
    originalSample.genre = sampleData.genre ? sampleData.genre : originalSample.genre;
    originalSample.sampleUrl = sampleData.sampleUrl ? sampleData.sampleUrl : originalSample.sampleUrl;
    originalSample.tempo = sampleData.tempo ? sampleData.tempo : originalSample.tempo;
    await originalSample.save();
    return originalSample;
  }
  
  
  
  
  
 async removeSample(sampleId, userId) {
   const sample = await this.getOneSample(sampleId)
   // @ts-ignore
   if(sample.creatorId.toString() != userId) throw new Forbidden('Sorry, this sample does not belong to you. Please Log in to the correct account.')

   // @ts-ignore
   await sample.remove()
   // @ts-ignore
   return `this ${sample.name} has been deleted!`
  }
  async getOneSample(sampleId) {
    const sample = await dbContext.Sample.findById(sampleId)

    // @ts-ignore
    sample.streams++
    // @ts-ignore
    await sample.save()
    return sample
  }
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