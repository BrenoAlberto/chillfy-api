const dbHandler = require("../dbHandler");
dbHandler.importModels();
const artistService = require("../../services/artist");
const spotifyApiMock = require("../spotifyApiMock");

jest.setTimeout(30000);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Artist Service ", () => {
  describe("Insert artist", () => {
    it("When provided artist data, insert successfully and get artist", async () => {
      const mockArtistData = spotifyApiMock.artistsData[0];
      const artist = await artistService.getsertArtist(
        spotifyApiMock,
        mockArtistData.id
      );

      expect(artist).toHaveProperty("_id");
      expect(artist.name).toEqual(mockArtistData.name);
      expect(artist.spotifyId).toEqual(mockArtistData.id);
    });
  });
});
