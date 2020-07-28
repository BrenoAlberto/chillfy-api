const search = async (spotifyApi, query, type, market = null) => {
  try {
    const options = {};
    if (market) options.market = market;
    return (await spotifyApi.search(query, type, options)).body;
  } catch (e) {}
};

module.exports = {
  search,
};
