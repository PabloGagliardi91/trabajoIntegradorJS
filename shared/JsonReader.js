class JsonReader {
    constructor (fileLocation, codecFormat) {
        this.file = fs.readFileSync(fileLocation, codecFormat);
    }
}

module.exports = JsonReader;