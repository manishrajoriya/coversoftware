import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 import { z } from "zod";
 import sharp from "sharp";
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 50 } })
    .input(z.object({ configId: z.string().optional() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      return {input}
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const { configId } = metadata.input
      console.log("configId", configId)
      const res = await fetch(file.url)
      const buffer = await res.arrayBuffer()
      const imageMetadata = await sharp(buffer).metadata()
      console.log("imageMetadata", imageMetadata)
      const { width, height, format } = imageMetadata
      
      if (!configId) {
        const configuration = await 
      }
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { width, height, format };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;