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

module.exports.getTrack = (id) => {
  const track = this.tracksData.find((trackData) => trackData.id === id);
  return {
    body: track,
  };
};

module.exports.getArtist = (id) => {
  const artist = this.artistsData.find((artistData) => artistData.id === id);
  return {
    body: artist,
  };
};

module.exports.getAlbum = (id) => {
  const album = this.albumsData.find((albumData) => albumData.id === id);
  return {
    body: album,
  };
};

module.exports.getAlbumTracks = (id, options) => {
  const tracks = this.tracksData.find((trackData) => trackData.album.id === id);

  return {
    body: {
      total: tracks.length,
      tracks,
    },
  };
};

module.exports.artistIds = ["4O15NlyKLIASxsJ0PrXPfz"];

module.exports.artistsData = [
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
];

module.exports.trackIds = ["0uxSUdBrJy9Un0EYoBowng"];

module.exports.tracksData = [
  {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/4O15NlyKLIASxsJ0PrXPfz",
          },
          href: "https://api.spotify.com/v1/artists/4O15NlyKLIASxsJ0PrXPfz",
          id: "4O15NlyKLIASxsJ0PrXPfz",
          name: "Lil Uzi Vert",
          type: "artist",
          uri: "spotify:artist:4O15NlyKLIASxsJ0PrXPfz",
        },
      ],
      available_markets: available_markets,
      href: "https://api.spotify.com/v1/albums/0zicd2mBV8HTzSubByj4vP",
      id: "0zicd2mBV8HTzSubByj4vP",
      images: [
        {
          height: 640,
          url:
            "https://i.scdn.co/image/ab67616d0000b2730d5a84e4e47399d2726c330c",
          width: 640,
        },
        {
          height: 300,
          url:
            "https://i.scdn.co/image/ab67616d00001e020d5a84e4e47399d2726c330c",
          width: 300,
        },
        {
          height: 64,
          url:
            "https://i.scdn.co/image/ab67616d000048510d5a84e4e47399d2726c330c",
          width: 64,
        },
      ],
      name: "Luv Is Rage 2 (Deluxe)",
      release_date: "2017-11-17",
      release_date_precision: "day",
      total_tracks: 20,
      type: "album",
      uri: "spotify:album:0zicd2mBV8HTzSubByj4vP",
    },
    artists: [
      {
        href: "https://api.spotify.com/v1/artists/4O15NlyKLIASxsJ0PrXPfz",
        id: "4O15NlyKLIASxsJ0PrXPfz",
        name: "Lil Uzi Vert",
        type: "artist",
        uri: "spotify:artist:4O15NlyKLIASxsJ0PrXPfz",
      },
    ],
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
];

module.exports.albumsData = [
  {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/4O15NlyKLIASxsJ0PrXPfz",
        },
        href: "https://api.spotify.com/v1/artists/4O15NlyKLIASxsJ0PrXPfz",
        id: "4O15NlyKLIASxsJ0PrXPfz",
        name: "Lil Uzi Vert",
        type: "artist",
        uri: "spotify:artist:4O15NlyKLIASxsJ0PrXPfz",
      },
    ],
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
    tracks: [
      {
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/4O15NlyKLIASxsJ0PrXPfz",
            },
            href: "https://api.spotify.com/v1/artists/4O15NlyKLIASxsJ0PrXPfz",
            id: "4O15NlyKLIASxsJ0PrXPfz",
            name: "Lil Uzi Vert",
            type: "artist",
            uri: "spotify:artist:4O15NlyKLIASxsJ0PrXPfz",
          },
        ],
        available_markets: available_markets,
        disc_number: 1,
        duration_ms: 220586,
        explicit: true,
        external_urls: {
          spotify: "https://open.spotify.com/track/0uxSUdBrJy9Un0EYoBowng",
        },
        href: "https://api.spotify.com/v1/tracks/0uxSUdBrJy9Un0EYoBowng",
        id: "0uxSUdBrJy9Un0EYoBowng",
        is_local: false,
        name: "20 Min",
        preview_url:
          "https://p.scdn.co/mp3-preview/839fb8d9ef7958acb49153a4d8e00d2d7f117d2d?cid=774b29d4f13844c495f206cafdad9c86",
        track_number: 20,
        type: "track",
        uri: "spotify:track:0uxSUdBrJy9Un0EYoBowng",
      },
    ],
    limit: 50,
    next: null,
    offset: 0,
    previous: null,
    total: 1,
  },
];
