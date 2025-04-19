// Create a function that handles file uploads using UploadThing
export const uploadFileWithUploadThing = async (
  file: File
): Promise<string | null> => {
  try {
    // Since we can't use React hooks in a plain function, we need to use the direct API
    // Create a FormData object to upload the file
    const formData = new FormData();
    formData.append("file", file);

    // Use fetch to upload to the UploadThing endpoint
    const res = await fetch("/api/uploadthing", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.fileUrl || null;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
};

// Configuration for the FileHandler extension
export const fileHandlerConfig = {
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/plain",
    "text/markdown",
  ],
  onPaste: (currentEditor, files, pos) => {
    files.forEach(async (file) => {
      // Show a temporary data URL while uploading

      // Upload the file to UploadThing
      const uploadedUrl = await uploadFileWithUploadThing(file);

      console.log("Uploaded URL:", uploadedUrl);

      if (uploadedUrl) {
        // Replace the temporary image with the uploaded one
        const nodes = currentEditor.state.doc.descendants((node, pos) => {
          if (
            node.type.name === "image" &&
            node.attrs["data-temp-id"] === tempId
          ) {
            currentEditor
              .chain()
              .setNodeSelection(pos)
              .updateAttributes("image", {
                src: uploadedUrl,
              })
              .run();
            return true;
          }
          return false;
        });
      }
    });
  },
  onDrop: (currentEditor, files, pos) => {
    files.forEach(async (file) => {
      // Show a temporary data URL while uploading
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = async () => {
        // First insert with the data URL for immediate feedback
        const tempId = `temp-${Date.now()}`;
        currentEditor
          .chain()
          .insertContentAt(pos, {
            type: "image",
            attrs: {
              src: fileReader.result,
              "data-temp-id": tempId,
            },
          })
          .focus()
          .run();

        // Upload the file to UploadThing
        const uploadedUrl = await uploadFileWithUploadThing(file);

        if (uploadedUrl) {
          // Replace the temporary image with the uploaded one
          const nodes = currentEditor.state.doc.descendants((node, pos) => {
            if (
              node.type.name === "image" &&
              node.attrs["data-temp-id"] === tempId
            ) {
              currentEditor
                .chain()
                .setNodeSelection(pos)
                .updateAttributes("image", {
                  src: uploadedUrl,
                  "data-temp-id": null,
                })
                .run();
              return true;
            }
            return false;
          });
        }
      };
    });
  },
  // This function is called for each file when dropped
  onUploadFile: async (file: File) => {
    return await uploadFileWithUploadThing(file);
  },
};
