import { Observable } from "rxjs";

import { ReadStream } from "fs-extra";
import { Readable } from "stream";

export default function fromStream(stream: Readable, finishEventName = "end", dataEventName = "data") {
    stream.pause();

    return new Observable((observer) => {
        function dataHandler(data: any) {
            observer.next(data);
        }

        function errorHandler(err: any) {
            observer.error(err);
        }

        function endHandler() {
            observer.complete();
        }

        stream.addListener(dataEventName, dataHandler);
        stream.addListener('error', errorHandler);
        stream.addListener(finishEventName, endHandler);

        stream.resume();

        return () => {
            stream.removeListener(dataEventName, dataHandler);
            stream.removeListener('error', errorHandler);
            stream.removeListener(finishEventName, endHandler);
        };
    });
}

