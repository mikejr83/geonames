export class AlternateName {
    public alternatenameId: number;
    public geonameId: number;
    public isoLanguage: string;
    public alternateName: string;
    public isPreferredName: boolean;
    public isShortName: boolean;
    public isColloquial: boolean;
    public isHistoric: boolean;
    public from: string;
    public to: string;

    constructor([id, geonameid, isoLanguage, alternateName, isPreferredName, isShortName, isColloquial, isHistoric, from, to]: string[]) {
        this.alternatenameId = parseInt(id, 10);
        this.geonameId = parseInt(geonameid, 10);
        this.isoLanguage = isoLanguage;
        this.alternateName = alternateName;
        this.isPreferredName = isPreferredName !== undefined && isPreferredName !== null && isPreferredName === "1";
        this.isShortName = isShortName !== undefined && isShortName !== null && isShortName === "1";
        this.isColloquial = isColloquial !== undefined && isColloquial !== null && isColloquial === "1";
        this.isHistoric = isHistoric !== undefined && isHistoric !== null && isHistoric === "1";
        this.from = from;
        this.to = to;
    }
}