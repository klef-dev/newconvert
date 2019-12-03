module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3333"
      },
      "/student": {
        target: "https://core.lmu.edu.ng:4846/api"
      }
    }
  }
};
