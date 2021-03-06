const dbHandler = require("../dbHandler");
dbHandler.importModels();
const trackService = require("../../services/track");
const artistService = require("../../services/artist");
const spotifyApiMock = require("../spotifyApiMock");
const { pushReferenceToDocument } = require("../../utils/mongo");

jest.setTimeout(30000);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Mongo utils ", () => {
  describe("Push reference to document", () => {
    it("When insert a artist reference to a document without artists reference, insert reference successfully and return document", async () => {
      const mockTrack = spotifyApiMock.tracksData[0];
      const track = await trackService.getsertTrack(
        spotifyApiMock,
        mockTrack.id
      );

      const mockArtist = spotifyApiMock.artistsData[1];
      const artist = await artistService.getsertArtist(
        spotifyApiMock,
        mockArtist.id
      );

      pushReferenceToDocument(track, artist._id, "artists");

      expect(track.artists.length).toEqual(2);
      expect(track.artists[1]).toEqual(artist._id);
    });
    it("When insert a artist reference to a document with artists reference, insert reference successfully and return document", async () => {
      const mockTrack = spotifyApiMock.tracksData[0];
      const track = await trackService.getsertTrack(
        spotifyApiMock,
        mockTrack.id
      );

      const mockArtist1 = spotifyApiMock.artistsData[0];
      const mockArtist2 = spotifyApiMock.artistsData[1];
      const artist1 = await artistService.getsertArtist(
        spotifyApiMock,
        mockArtist1.id
      );
      const artist2 = await artistService.getsertArtist(
        spotifyApiMock,
        mockArtist2.id
      );

      pushReferenceToDocument(track, artist1._id, "artists");
      pushReferenceToDocument(track, artist2._id, "artists");

      expect(track.artists.length).toEqual(3);
      expect(track.artists[1]).toEqual(artist1._id);
      expect(track.artists[2]).toEqual(artist2._id);
    });
  });
});
