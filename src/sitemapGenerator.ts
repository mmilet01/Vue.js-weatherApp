require("babel-register")({
  presets: ["babel-preset-es2016", "babel-preset-vue"],
});

const router = require("./sitemapRoutes.ts").default;
const Sitemap = require("vue-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://localhost:8080")
    .save("./public/sitemap.xml");
}

generateSitemap();
