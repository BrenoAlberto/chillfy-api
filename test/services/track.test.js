const dbHandler = require("../dbHandler");
dbHandler.importModels();
const trackService = require("../../services/track");
const spotifyApiMock = require("../spotifyApiMock");

jest.setTimeout(30000);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Track Service ", () => {
  describe("Insert track", () => {
    it("When provided track data, insert successfully and get track", async () => {
      const mockTrack = spotifyApiMock.tracksData[0];
      const track = await trackService.getSertTrack(
        spotifyApiMock,
        mockTrack.id
      );

      expect(track).toHaveProperty("_id");
      expect(track.name).toEqual(mockTrack.name);
      expect(track.spotifyId).toEqual(mockTrack.id);
    });
  });
  describe("Insert sample", () => {
    it("When provided sample data, insert successfully and get track", async () => {
      const mockTrackId = spotifyApiMock.trackIds[0];
      let track = await trackService.getSertTrack(spotifyApiMock, mockTrackId);

      const mockSampleId = spotifyApiMock.trackIds[1];
      track = await trackService.insertSample(
        spotifyApiMock,
        track.spotifyId,
        mockSampleId,
        "sample"
      );

      expect(track.samples.length).toEqual(1);
      expect(track.samples).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.objectContaining({ spotifyId: mockSampleId }),
          }),
        ])
      );
    });
  });
  describe("Insert album tracks", () => {
    it("When provided album data, insert successfully his tracks and returns", async () => {
      const mockAlbumId = spotifyApiMock.albumIds[0];
      const tracks = await trackService.getSertAlbumTracks(
        spotifyApiMock,
        mockAlbumId
      );

      expect(tracks.length).toEqual(2);
      expect(tracks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            album: expect.objectContaining({
              spotifyId: mockAlbumId,
            }),
          }),
        ])
      );
    });
  });
});
