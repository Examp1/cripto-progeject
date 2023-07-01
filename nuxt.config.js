const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'project-name',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/test.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/image',
  ],

  image: {
    // provider: '~/plugins/webp-provider.js'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // '@aceforth/nuxt-optimized-images',
  ],
  // optimizedImages: {
  //   optimizeImages: true,
  //   optimizeImagesInDev: true,
  //   mozjpeg: {
  //     quality: 5,
  //   },
  //   webp: {
  //     preset: 'default',
  //     quality: 5,
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      // add imagemin-webp-webpack-plugin
      if (!isDev && isClient) {
        config.plugins.push(
          new ImageminWebpWebpackPlugin({
            detailedLogs: true,
            overrideExtension: true,
            config: [
              {
                test: /\.(jpe?g|png)/,
                options: {
                  quality: 75,
                },
              },
            ],
          })
        );
      }
    },
  },
}
