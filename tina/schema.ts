import { defineConfig } from "tinacms";

export default defineConfig({
  contentApiUrlOverride: "",
  branch: "main",
  clientId: "dummy", // 可留空，測試階段不影響
  token: "dummy",
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
