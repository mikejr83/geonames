import { Parser } from "csv-parse";
import * as fs from "fs-extra";
import * as path from "path";
import { Observable } from "rxjs";

import fromStream from "../from-stream";
import { map, tap } from "rxjs/operators";

export abstract class Factory {
    protected abstract importFileName: string;
    protected abstract exportFileName: string;

    protected abstract exportHeader: string;
    protected abstract exportFooter: string;

    protected abstract insertStatementBeginning: string;

    protected abstract makeValuesSegment(values: string[]): string;

    public createExportDumpFile(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Processing ${this.importFileName}`);

            const data = new Observable((observer) => {
                const parser = new Parser({
                    delimiter: "\t",
                    skip_lines_with_error: true
                });
                const lines$ = fromStream(fs.createReadStream(this.importFileName).pipe(parser));

                lines$.subscribe(observer);
            });

            fs.mkdirpSync("dump");
            const fileWriter = fs.createWriteStream(path.join("dump", this.exportFileName), {
                autoClose: true,
                encoding: "utf8"
            });
            fileWriter.write(this.exportHeader);
            fileWriter.write("\n");
            fileWriter.write(this.insertStatementBeginning);

            let written = 0;
            let first = true;

            data
                .pipe(
                    map((val: string[]) => `${!first ? "," : ""}${this.makeValuesSegment(val)}`),
                    tap(() => first = false)
                )
                .subscribe(
                    (insertStatement) => {
                        fileWriter.write(insertStatement);
                        written++;

                        if (written % 1000 === 0) {
                            first = true;
                            fileWriter.write(`;
${this.insertStatementBeginning} `);
                        }

                        if (written % 10000 === 0) {
                            console.log(`Wrote ${written} statements.`);
                        }
                    },
                    (error) => {
                        console.error("Whooops", error);
                        reject(error);
                    },
                    () => {
                        console.log(`Wrote ${written} statements.`);
                        fileWriter.write(this.exportFooter);
                        fileWriter.close();
                        console.log(`Done writing ${this.exportFileName}`);
                        resolve();
                    });
        });

    }


}