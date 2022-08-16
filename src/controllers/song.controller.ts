import { Request, Response } from "express"
import { SongFilter } from "../interfaces/filters/song.filter";
import { DeleteSongRequestModel } from "../models/requestModels/deleteSong.request.model";
import { GetSongRequestModel } from "../models/requestModels/getSong.request.model";
import { SaveSongRequestModel } from "../models/requestModels/saveSong.request.model"
import { UpdateSongRequestModel } from "../models/requestModels/updateSong.request.model";
import { SongResponseModel } from "../models/responseModels/song.response.model";
import { SongService } from "../services/song.service"

export class SongController {

    private songService: SongService = new SongService();

    public index = async (request: Request, response: Response) => {
       return response.status(200).json({ message: "Text"})
    }

    public getSong = async (request: Request, response: Response) => {
        let songRequestModel: GetSongRequestModel = { id: request.params.id};
        const song = this.songService.getSpecificSong(songRequestModel);
        let songResponseModel: SongResponseModel | null = null
        if (song) {
            songResponseModel = {
                id: song?.id,
                name: song?.name,
                genre: song?.genre,
                artist: song?.artist
            }
        }
        return response.status(200).json({ message: songResponseModel })
    }

    public allSongs = async (request: Request, response: Response) => {
        const filter : SongFilter = {
            name: request.query.name?.toString(),
            genre: request.query.genre?.toString(),
            artist: request.query.artist?.toString()
        };
        const songCollection = this.songService.getAllSongs(filter);
        return response.status(200).json({ message: songCollection})
    }

    public deleteSong = async (request: Request, response: Response) => {
        const deleteSongRequestModle : DeleteSongRequestModel = { id: request.params.id};
        this.songService.deleteSong(deleteSongRequestModle);
        return response.status(200).json({ message: "Song deleted"})
    }

    public saveSong = async (request: Request, response: Response) => {
        let songRequestModel: SaveSongRequestModel = request.body;
        this.songService.saveSongToDataSource(songRequestModel);
        return response.status(201).json({ message: "Song saved"})
    }

    public updateSong = async (request: Request, response: Response) => {
        let songRequestModel: UpdateSongRequestModel = request.body;
        songRequestModel.id = request.params.id;
        this.songService.updateSongToDataSource(songRequestModel);
        return response.status(200).json({ message: "Song Updated"})
    }
}