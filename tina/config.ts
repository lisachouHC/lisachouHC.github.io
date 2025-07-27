import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content",
        format:"md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type:"boolean",
            name:"draft",
            label:"Draft",
            description:"If this post is a draft, it will not be published.",
          },
          {
            name:"tags",
            label:"Tags",
            type:"string",
            list: true,
            description:"Tags for this post, used for filtering and categorization.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          { 
            name:"series",
            label:"Series",
            type:"string",
            list: true,
            description:"Series for this post, used for grouping related posts.",
          },{
            name:"seriesorder",
            label:"Series Order",
            type:"number",
            description:"Order of this post in the series, used for sorting within the series.",
          },
          {
            name:"blocks",
            label:"Blocks",
            type:"object",
            list: true,
            templates: [{
              name:"welcome",
              label:"Welcome",
              fields: [
                {
                  type: "rich-text",
                  name: "message",
                }],
            }]
          },
        ],
      },
    ],
  },
});
