import { getFactories } from "./factories";

async function createFiles() {
    const factories = getFactories();

    for (const factory of factories) {
        try {
            await factory.createExportDumpFile();
        }
        catch (e) {
            console.error("Unable to process file with factory...", e);
        }
    }
}

createFiles().then(() => {
    console.log("Completed all files.");
});

