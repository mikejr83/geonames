import { AllCountriesFactory } from "./allCountries";
import { AlternateNamesFactory } from "./alternateNames";
import { Factory } from "./factory";

export function getFactories(): Factory[] {
    return [
        new AllCountriesFactory(),
        new AlternateNamesFactory()
    ];
}