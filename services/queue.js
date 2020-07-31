const queueRepository = require("../repository/queue");

const insertGetSamples = async (
  trackId,
  artistName,
  trackName,
  { access_token, refresh_token, refresh_at }
) => {
  return await queueRepository.insertItem({
    type: "getSamples",
    data: {
      spotifyId: trackId,
      artist: artistName,
      track: trackName,
      spotifyCredentials: {
        access_token,
        refresh_token,
        refresh_at,
      },
    },
    date: Date.now(),
  });
};

module.exports = {
  insertGetSamples,
};
