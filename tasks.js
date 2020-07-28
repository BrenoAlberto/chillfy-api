const cron = require("node-cron");
const queueRepository = require("./repository/queue");
const trackService = require("./services/track");
const trackRepository = require("./repository/track");
require("dotenv").config();
const WS_CRAWLER_API = process.env.WS_CRAWLER_API;
const axios = require("axios");
const { setSpotifyApi } = require("./services/spotify");

let isExecutingGetSamples = false;
let isExecutingGetArtistData = false;

const getSamples = async () => {
  const insertSamples = async (
    spotifyApi,
    trackId,
    sampleType,
    samples_data
  ) => {
    for (let i = 0; i < samples_data.length; i++) {
      const sampleData = samples_data[i];

      await trackService.insertSample(
        spotifyApi,
        trackId,
        null,
        sampleType,
        null,
        sampleData
      );
    }
  };

  if (!isExecutingGetSamples) {
    try {
      isExecutingGetSamples = true;

      const queue = await queueRepository.getQueue(
        { type: "getSamples", status: "pending" },
        { date: 1 }
      );

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        const { id, artist, track, spotifyCredentials } = item.data; //spotifyApi temporary
        const spotifyApi = await setSpotifyApi(spotifyCredentials);

        const response = await axios.get(
          `${WS_CRAWLER_API}/ws/samples/${artist}/${track}`
        );

        if (response.status === 200) {
          const { covers_data, sampled_data, samples_data } = response.data;
          await insertSamples(spotifyApi, id, "sample", samples_data);
          await insertSamples(spotifyApi, id, "sampledIn", sampled_data);
          await insertSamples(spotifyApi, id, "coveredIn", covers_data);

          await trackRepository.updateTrack(id, { ws_crawled: true });
          await queueRepository.updateItem(item.id, { status: "completed" });
        } else {
          await queueRepository.updateItem(item.id, { status: "error" });
        }
      }
    } finally {
      isExecutingGetSamples = false;
    }
  }
};

// const getArtistData = async () => {
//   if (!isExecutingGetArtistData) {
//     try {
//       isExecutingGetArtistData = true;

//       const queue = await queueRepository.getQueue(
//         { type: "getArtistData" },
//         { date: 1 }
//       );

//       for (let i = 0; i < queue.length; i++) {
//         const item = queue[i];
//         const {}

//       }
//     } finally {
//       isExecutingGetArtistData = false;
//     }
//   }
// };

cron.schedule("*/30 * * * * *", getSamples);
// cron.schedule("*/30 * * * * *", getArtistData);
