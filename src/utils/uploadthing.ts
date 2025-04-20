import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";

// Export the components with our router type
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const useUploader = generateUploader<OurFileRouter>();
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
