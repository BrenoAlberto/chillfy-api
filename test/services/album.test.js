const dbHandler = require("../dbHandler");
dbHandler.importModels();
const albumService = require("../../services/album");
const spotifyApiMock = require("../spotifyApiMock");
const { artistIds } = require("../spotifyApiMock");

jest.setTimeout(30000);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Album Service ", () => {
  describe("Insert album", () => {
    it("When provided album data, insert successfully and get album", async () => {
      const mockAlbum = spotifyApiMock.albumsData[0];
      const album = await albumService.getsertAlbum(
        spotifyApiMock,
        mockAlbum.id
      );

      expect(album).toHaveProperty("_id");
      expect(album.name).toEqual(mockAlbum.name);
      expect(album.spotifyAlbumId).toEqual(mockAlbum.id);
    });
  });
  describe("Insert albums", () => {
    it("When provided artist id, insert artist albums successfully and get albums", async () => {
      const artistId = spotifyApiMock.artistIds[0];
      const albums = await albumService.getsertArtistAlbums(
        spotifyApiMock,
        artistId
      );

      const mockArtistAlbums = spotifyApiMock.getArtistAlbums(artistId);

      expect(albums.length).toEqual(mockArtistAlbums.body.total);
    });
  });
});
