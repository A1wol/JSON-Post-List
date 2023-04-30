const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/mixins.scss";
        @import "@/assets/scss/variable.scss";
        `,
      },
    },
  },
});
