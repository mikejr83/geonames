import { Parser } from "csv-parse";
import * as fs from "fs-extra";
import { createConnection, createPool, MysqlError, FieldInfo, Pool, queryCallback, PoolConnection, escape } from "mysql";
import { Observable } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

import fromStream from "./from-stream";
import { GeoName, AlternateName } from "./models";
import { promisify } from "util";

// const pool: Pool = createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: "nodeuser",
//     password: "titan#12",
//     database: "geonames",
//     insecureAuth: true
// });

const data = new Observable((observer) => {
    const parser = new Parser({
        delimiter: "\t",
        skip_lines_with_error: true
    });
    const lines$ = fromStream(fs.createReadStream("./alternateNamesV2.txt").pipe(parser));
    // const lines$ = fromStream(fs.createReadStream("./top.txt").pipe(parser));

    lines$.subscribe(observer);
});

const filewriter = fs.createWriteStream("./geonames_alternatename.sql", {
    autoClose: true,
    encoding: "utf8"
});
filewriter.write(`-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: geonames
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table \`alternatename\`
--

DROP TABLE IF EXISTS \`alternatename\`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
 CREATE TABLE \`alternatename\` (
    \`alternatenameId\` int(11) NOT NULL,
    \`geonameid\` int(11) DEFAULT NULL,
    \`isoLanguage\` varchar(7) DEFAULT NULL,
    \`alternateName\` varchar(200) DEFAULT NULL,
    \`isPreferredName\` tinyint(1) DEFAULT NULL,
    \`isShortName\` tinyint(1) DEFAULT NULL,
    \`isColloquial\` tinyint(1) DEFAULT NULL,
    \`isHistoric\` tinyint(1) DEFAULT NULL,
    \`from\` varchar(10) DEFAULT NULL,
    \`to\` varchar(10) DEFAULT NULL,
    PRIMARY KEY (\`alternatenameId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table \`alternatename\`
--

LOCK TABLES \`alternatename\` WRITE;
/*!40000 ALTER TABLE \`alternatename\` DISABLE KEYS */;
INSERT INTO \`alternatename\` VALUES `);
let written = 0;
let first = true;
data
    .pipe(
        map((val: string[]) => `${!first ? "," : ""}(${val[0]}, ${val[1]}, ${escape(val[2])}, ${escape(val[3])}, ${(val[4] !== undefined && val[4] !== null && val[4] === "1") ? 1 : 0}, ${(val[5] !== undefined && val[5] !== null && val[5] === "1") ? 1 : 0}, ${(val[6] !== undefined && val[6] !== null && val[6] === "1") ? 1 : 0}, ${(val[7] !== undefined && val[7] !== null && val[7] === "1") ? 1 : 0}, ${escape(val[8])}, ${escape(val[9])})`),
        tap(() => first = false)
    )
    .subscribe((insertStatement: string) => {
        filewriter.write(insertStatement);
        written++;

        if (written % 1000 === 0) {
            first = true;
            filewriter.write(`;
INSERT INTO \`alternatename\` VALUES `);
        }

        if (written % 10000 === 0) {
            console.log(`Wrote ${written} statements.`);
        }
    },
        (error) => console.error("Whooops", error),
        () => {
            console.log("DONE");
            console.log(`Wrote ${written} statements.`);
            filewriter.write(`;
/*!40000 ALTER TABLE \`alternatename\` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-30 22:56:01
`)
            filewriter.close();
        });

