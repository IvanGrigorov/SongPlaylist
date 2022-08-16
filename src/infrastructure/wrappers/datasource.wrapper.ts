import { SongDTO } from "../../DTO/song.dto";
import { FileDataSourceLib } from "../../libs/datasource.lib";
import { Config } from "../config";

export class DataSourceWrapper {

    public read() : Array<SongDTO> {
        return new FileDataSourceLib(Config.fileDataSource).readJSON();
    }

    public write(data: Object) : void {
        return new FileDataSourceLib(Config.fileDataSource).writeToJSON(data);
    }

    public update(data: Object) : void {
        return new FileDataSourceLib(Config.fileDataSource).updateToJSON(data);
    }
}