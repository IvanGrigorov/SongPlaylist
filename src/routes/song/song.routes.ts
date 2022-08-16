import { SongController } from "../../controllers/song.controller";
import { Route } from "../../interfaces/routes/route";
import { AbstractRoute } from "../abstract/abstract.routes";

export class SongRoute extends AbstractRoute implements Route {

    private controller = new SongController();

    public initialiseRoute() {
        this.app.get(this.basePath + this.restQuery + '/all', this.controller.allSongs);
        this.app.get(this.basePath + this.restQuery + '/:id', this.controller.getSong)
        this.app.post(this.basePath + this.restQuery, this.controller.saveSong);
        this.app.put(this.basePath + this.restQuery + '/:id', this.controller.updateSong);
        this.app.delete(this.basePath + this.restQuery + '/:id', this.controller.deleteSong);
    }
}