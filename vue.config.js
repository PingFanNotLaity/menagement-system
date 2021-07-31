module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  publicPath: "./",
  outputDir: process.env.outputDir,
}