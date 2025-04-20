import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export route handlers for GET and POST
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    logLevel: "All",
  },
});

// Set runtime to nodejs explicitly for file uploads
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "128GB",
    },
  },
};
