const queueRepository = require("../repository/queue");

const insertGetSamples = async (
  spotifyTrackId,
  artistName,
  trackName,
  { access_token, refresh_token, refresh_at }
) => {
  return await queueRepository.insertItem({
    type: "getSamples",
    data: {
      spotifyTrackId,
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
