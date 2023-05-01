const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/JSON-Post-List/",
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
