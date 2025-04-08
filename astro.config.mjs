// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Docs",
      // sidebar: [
      //   {
      //     label: "公司文档",
      //     items: [
      //       { label: "Cococat 群聊开发", link: "/company/coco-doc-0408/" }
      //     ],
      //   },
      // ],
    }),
  ],
});
