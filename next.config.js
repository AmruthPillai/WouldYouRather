module.exports = {
  async rewrites() {
    return [
      {
        source: "/g/:id",
        destination: "/game/:id",
      },
    ];
  },
};
