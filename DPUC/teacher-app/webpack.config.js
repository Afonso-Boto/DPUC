module.exports = {
    resolve:{
      fallback:{
        "http": false,
        "https": require.resolve("https-browserify")
      }
    }
};
