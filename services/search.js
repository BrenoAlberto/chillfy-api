const search = async (spotifyApi, query, type, market = null) => {
  return (await spotifyApi.search(query, type, { market })).body;
};

module.exports = {
  search,
};
