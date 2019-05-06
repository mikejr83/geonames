import { Factory } from "./factory";

export class AllCountriesFactory extends Factory {
    protected insertStatementBeginning: string;
    public static INPUT_FILENAME = "allCountries.txt";
    public static EXPORT_FILENAME = "geoname_geoname.sql";

    protected importFileName = AllCountriesFactory.INPUT_FILENAME;
    protected exportFileName = AllCountriesFactory.EXPORT_FILENAME;
    protected exportHeader: string;
    protected exportFooter: string;
    
    protected makeValuesSegment(values: string[]): string {
        throw new Error("Method not implemented.");
    }
    
}