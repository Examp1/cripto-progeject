import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin'
import { join } from 'path'
import { promisify } from 'util'
import { readFile } from 'fs'

// Функция для конвертации изображения в формат webp с помощью imagemin-webp-webpack-plugin
async function webpConverter(inputPath, outputPath) {
  const imageminWebp = new ImageminWebpWebpackPlugin({
    overrideExtension: true,
    detailedLogs: false,
    config: [{
      test: /\.(jpe?g|png)$/i,
      options: {
        quality: 75,
      }
    }]
  })
  const buffer = await promisify(readFile)(inputPath)
  const result = await imageminWebp.process(buffer, { context: { options: {} }, outputPath })
  return result.data
}

export default function webpProvider({ require }) {
  const optimizedImages = require('@aceforth/nuxt-optimized-images')

  return function customProvider({ src, width, quality, format }) {
    if (format === 'webp') {
      // Если формат изображения - webp, то используем webpConverter для конвертации
      const filePath = optimizedImages.generateImagePath({ src, width, quality })
      const outputPath = join(optimizedImages.options.optimizedImagesDir, filePath)
      return webpConverter(join(optimizedImages.options.staticDir, src), outputPath)
    } else {
      // В противном случае, используем встроенный провайдер из nuxt-image
      return optimizedImages.provider.defaultProvider({ src, width, quality, format })
    }
  }
}
