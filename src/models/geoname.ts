export class GeoName {
    public geoNameId: number;
    public name: string;
    public asciiName: string;
    public alternatenames: string;
    public latitude: number;
    public longitude: number;
    public fclass: string;
    public fcode: string;
    public country: string;
    public cc2: string;
    public admin1: string;
    public admin2: string;
    public admin3: string;
    public admin4: string;
    public population: number;
    public elevation?: number;
    public gtopo30: number;
    public timezone: string;
    public moddate: string

    constructor(val: string[]) {
        this.geoNameId = parseInt(val[0], 10);
        this.name = val[1];
        this.asciiName = val[2];
        this.alternatenames = val[3];
        this.latitude = parseFloat(val[4]);
        this.longitude = parseFloat(val[5]);
        this.fclass = val[6];
        this.fcode = val[7];
        this.country = val[8];
        this.cc2 = val[9];
        this.admin1 = val[10];
        this.admin2 = val[11];
        this.admin3 = val[12];
        this.admin4 = val[13];
        this.population = parseInt(val[14], 10);
        if (val[15]) {
            this.elevation = parseInt(val[15], 10);
        }
        this.gtopo30 = parseInt(val[16], 10);
        this.timezone = val[17];
        this.moddate = val[18];
    }
}