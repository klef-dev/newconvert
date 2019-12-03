module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://196.13.111.60:8080"
      },
      "/student": {
        target: "https://core.lmu.edu.ng:4846/api"
      }
    }
  }
};
