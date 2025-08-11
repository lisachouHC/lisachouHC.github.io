import { defineConfig } from "tinacms";

export default defineConfig({
  contentApiUrlOverride: "http://localhost:4001/graphql",
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // 可留空，測試階段不影響
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
          },
        ],
      },
    ],
  },
});
