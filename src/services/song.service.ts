import { randomUUID } from "crypto";
import { SongDTO } from "../DTO/song.dto";
import { DataSourceWrapper } from "../infrastructure/wrappers/datasource.wrapper";
import { SongFilter } from "../interfaces/filters/song.filter";
import { DeleteSongRequestModel } from "../models/requestModels/deleteSong.request.model";
import { GetSongRequestModel } from "../models/requestModels/getSong.request.model";
import { SaveSongRequestModel } from "../models/requestModels/saveSong.request.model";
import { UpdateSongRequestModel } from "../models/requestModels/updateSong.request.model";
import { SongResponseModel } from "../models/responseModels/song.response.model";

export class SongService {

    private datasourceWrapper: DataSourceWrapper = new DataSourceWrapper();

    public saveSongToDataSource(song: SaveSongRequestModel) {
        const songToSave: SongDTO = {
            id: randomUUID(),
            name: song.name,
            genre: song.genre,
            artist: song.artist
        }
        this.datasourceWrapper.write(songToSave);
    }

    public updateSongToDataSource(updateSongRequestModel: UpdateSongRequestModel) {
        let songCollection : SongDTO[] =  this.datasourceWrapper.read();
        for (const song of songCollection) {
            if (song.id == updateSongRequestModel.id) {
                song.artist = updateSongRequestModel.artist;
                song.name = updateSongRequestModel.name;
                song.genre = updateSongRequestModel.genre;
            }
        }
        this.datasourceWrapper.update(songCollection);
    }

    public getSpecificSong(songRequestModel: GetSongRequestModel) : SongDTO | null {
        let songCollection : SongDTO[] =  this.datasourceWrapper.read();
        for (const song of songCollection) {
            if (song.id == songRequestModel.id) {
                return song;
            }
        }
        return null;
    }

    public deleteSong(deleteSongRequestModel: DeleteSongRequestModel) : void {
        let songCollection : SongDTO[] =  this.datasourceWrapper.read();
        let filteredCollection = songCollection.filter((song) => song.id != deleteSongRequestModel.id);
        this.datasourceWrapper.update(filteredCollection);
    }

    public getAllSongs(filter: SongFilter) : SongDTO[] {
        let songCollection : SongDTO[] =  this.datasourceWrapper.read();
        let filteredCollection = this.applyFilters(songCollection, filter);
        return filteredCollection;
    }

    private applyFilters(songCollection: SongDTO[], filters: SongFilter) {
        return songCollection.filter((song) => {
            let shouldReturn = true;
            type SongObjectKey = keyof typeof song;
            type FilterbjectKey = keyof typeof filters;

            Object.keys(filters).forEach((key) => {
                const songKey = key as SongObjectKey;
                const filterKey = key as FilterbjectKey;
                if (song[songKey] && filters[filterKey] && (song[songKey] != filters[filterKey])) {
                    shouldReturn = false
                }
            })
            return shouldReturn;
        })
    }
}