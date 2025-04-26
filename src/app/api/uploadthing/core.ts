import { getAuthUser } from "@/lib/auth/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter(err) {
    // Customize the error format
    console.log("Error:", err);
    return {
      message: err.message,
      code: err.code,
      stack: err.stack,
    };
  },
});

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define a file route for images and documents
  imageUploader: f({
    image: {
      maxFileSize: "128GB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      console.log("Middleware triggered");
      // This code runs on your server before upload
      const user = await getAuthUser();

      console.log("User in middleware:", user);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Return the file data to the client
      return { fileUrl: file.url, fileName: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
