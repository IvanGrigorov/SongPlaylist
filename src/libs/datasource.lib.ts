import { readFileSync, writeFileSync } from 'fs';

export class FileDataSourceLib {

    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public readJSON() {
        return JSON.parse(readFileSync(this.filePath).toString() || '[]');
    }

    public writeToJSON(data: any) {
        let currentSongs = this.readJSON();
        if (Array.isArray(currentSongs)) {
            currentSongs.push(data);
        }
        return writeFileSync(this.filePath, JSON.stringify(currentSongs));
    }

    public updateToJSON(data: any) {
        return writeFileSync(this.filePath, JSON.stringify(data));
    }
}