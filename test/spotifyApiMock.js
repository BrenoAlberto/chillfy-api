const { structuredClone } = require("../utils/util");
const available_markets = [
  "AD",
  "AE",
  "AL",
  "AR",
  "AT",
  "AU",
  "BA",
  "BE",
  "BG",
  "BH",
  "BO",
  "BR",
  "BY",
  "CA",
  "CH",
  "CL",
  "CO",
  "CR",
  "CY",
  "CZ",
  "DE",
  "DK",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "GT",
  "HK",
  "HN",
  "HR",
  "HU",
  "ID",
  "IE",
  "IL",
  "IN",
  "IS",
  "IT",
  "JO",
  "JP",
  "KW",
  "KZ",
  "LB",
  "LI",
  "LT",
  "LU",
  "LV",
  "MA",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "MX",
  "MY",
  "NI",
  "NL",
  "NO",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PH",
  "PL",
  "PS",
  "PT",
  "PY",
  "QA",
  "RO",
  "RS",
  "RU",
  "SA",
  "SE",
  "SG",
  "SI",
  "SK",
  "SV",
  "TH",
  "TN",
  "TR",
  "TW",
  "UA",
  "US",
  "UY",
  "VN",
  "XK",
  "ZA",
];

const search = () => {
  return {
    body: {
      tracks: {
        items: [tracksData[0]],
      },
    },
  };
};

const getTrack = (id) => {
  const track = structuredClone(
    tracksData.find((trackData) => trackData.id === id)
  );
  populateArtists(track);

  return {
    body: track,
  };
};

const populateArtists = (document) => {
  for (let i = 0; i < document.artists.length; i++) {
    document.artists[i] = artistsData.find(
      (artistData) => artistData.id === document.artists[i]
    );
  }
};

const getArtist = (id) => {
  const artist = artistsData.find((artistData) => artistData.id === id);
  return {
    body: artist,
  };
};

const getAlbum = (id) => {
  const album = albumsData.find((albumData) => albumData.id === id);
  return {
    body: album,
  };
};

const getAlbumTracks = (id, options) => {
  const tracks = tracksData.filter((trackData) => trackData.album === id);

  return {
    body: {
      total: tracks.length,
      items: tracks,
    },
  };
};

const getArtistAlbums = (id, options) => {
  const albums = albumsData.filter(
    (albumData) => albumData.artists[0].id === id
  );

  return {
    body: {
      total: albums.length,
      items: albums,
    },
  };
};

const artistIds = [
  "4O15NlyKLIASxsJ0PrXPfz",
  "5yPzzu25VzEk8qrGTLIrE1",
  "1XLWox9w1Yvbodui0SRhUQ",
];
const trackIds = ["0uxSUdBrJy9Un0EYoBowng", "3EWaR09H3TkRgaLTIheYFr"];
const albumIds = ["0zicd2mBV8HTzSubByj4vP"];

const artistsData = [
  {
    genres: ["melodic rap", "philly rap", "rap"],
    href: "https://api.spotify.com/v1/artists/4O15NlyKLIASxsJ0PrXPfz",
    id: "4O15NlyKLIASxsJ0PrXPfz",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/271c672ac7a84a95f3c557177a29b8936923d152",
        width: 640,
      },
      {
        height: 320,
        url: "https://i.scdn.co/image/0b57d28b204187ca97d4dbd700fa7e347ff05fa2",
        width: 320,
      },
      {
        height: 160,
        url: "https://i.scdn.co/image/43fb40412c6dd226997c52e3647304a97b1709a9",
        width: 160,
      },
    ],
    name: "Lil Uzi Vert",
    uri: "spotify:artist:4O15NlyKLIASxsJ0PrXPfz",
  },
  {
    genres: [
      "atl trap",
      "rap",
      "southern hip hop",
      "trap",
      "underground hip hop",
      "vapor trap",
    ],
    href: "https://api.spotify.com/v1/artists/5yPzzu25VzEk8qrGTLIrE1",
    id: "5yPzzu25VzEk8qrGTLIrE1",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ae8ef6c685aaf8c9c2749de0062488d6f9df9e69",
        width: 640,
      },
      {
        height: 320,
        url: "https://i.scdn.co/image/98bbdfc6f2613f677f7df45a3d53262185064b32",
        width: 320,
      },
      {
        height: 160,
        url: "https://i.scdn.co/image/fa31fc33533b30b427e973bb6a0b5e6898196310",
        width: 160,
      },
    ],
    name: "Young Nudy",
    popularity: 69,
    type: "artist",
    uri: "spotify:artist:5yPzzu25VzEk8qrGTLIrE1",
  },
  {
    genres: [],
    href: "https://api.spotify.com/v1/artists/1XLWox9w1Yvbodui0SRhUQ",
    id: "1XLWox9w1Yvbodui0SRhUQ",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/8dcf6ad6cb29257dc3e7c6c4cf1c4d3953413359",
        width: 640,
      },
      {
        height: 320,
        url: "https://i.scdn.co/image/16500716396c1994ec8b32b3e5e07ce143f75baf",
        width: 320,
      },
      {
        height: 160,
        url: "https://i.scdn.co/image/9b237c4d7b9ab171e1c6851b1f34f9b82fb17b03",
        width: 160,
      },
    ],
    name: "StaySolidRocky",
    uri: "spotify:artist:1XLWox9w1Yvbodui0SRhUQ",
  },
];

const albumsData = [
  {
    album_type: "album",
    artists: [artistsData[0]],
    available_markets: available_markets,
    genres: [],
    href: "https://api.spotify.com/v1/albums/0zicd2mBV8HTzSubByj4vP",
    id: "0zicd2mBV8HTzSubByj4vP",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b2730d5a84e4e47399d2726c330c",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e020d5a84e4e47399d2726c330c",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d000048510d5a84e4e47399d2726c330c",
        width: 64,
      },
    ],
    name: "Luv Is Rage 2 (Deluxe)",
    release_date: "2017-11-17",
    release_date_precision: "day",
    total_tracks: 1,
    type: "album",
    uri: "spotify:album:0zicd2mBV8HTzSubByj4vP",
    tracks: [trackIds[0], trackIds[1]],
    limit: 50,
    next: null,
    offset: 0,
    previous: null,
    total: 1,
  },
];

const tracksData = [
  {
    album: albumIds[0],
    artists: [artistIds[0]],
    available_markets: available_markets,
    disc_number: 1,
    duration_ms: 220586,
    explicit: true,
    href: "https://api.spotify.com/v1/tracks/0uxSUdBrJy9Un0EYoBowng",
    id: "0uxSUdBrJy9Un0EYoBowng",
    is_local: false,
    name: "20 Min",
    track_number: 20,
    uri: "spotify:track:0uxSUdBrJy9Un0EYoBowng",
  },
  {
    album: albumIds[0],
    artists: [artistIds[0]],
    available_markets: available_markets,
    disc_number: 1,
    duration_ms: 182706,
    explicit: true,
    href: "https://api.spotify.com/v1/tracks/3EWaR09H3TkRgaLTIheYFr",
    id: "3EWaR09H3TkRgaLTIheYFr",
    is_local: false,
    name: "XO Tour Llif3",
    track_number: 16,
    uri: "spotify:track:3EWaR09H3TkRgaLTIheYFr",
  },
];

const sleep = () => {
  //don't feel like sleeping
};

module.exports = {
  getTrack,
  getArtist,
  getAlbum,
  getArtistAlbums,
  getAlbumTracks,
  sleep,
  search,
  trackIds,
  albumIds,
  artistIds,
  artistsData,
  albumsData,
  tracksData,
};
