import { escape } from "mysql";

import { Factory } from "./factory";

export class AlternateNamesFactory extends Factory {
    public static INPUT_FILENAME = "top.txt";
    public static EXPORT_FILENAME = "geoname_alternatename.sql";

    public static EXPORT_HEADER = `-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
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
`;

    public static EXPORT_FOOTER = `;
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
`;

    protected importFileName = AlternateNamesFactory.INPUT_FILENAME;
    protected exportFileName = AlternateNamesFactory.EXPORT_FILENAME;
    protected exportHeader = AlternateNamesFactory.EXPORT_HEADER;
    protected exportFooter = AlternateNamesFactory.EXPORT_FOOTER;

    protected insertStatementBeginning = `INSERT INTO \`alternatename\` VALUES `;

    protected makeValuesSegment(values: string[]): string {
        return `(${values[0]}, ${values[1]}, ${escape(values[2])}, ${escape(values[3])}, ${(values[4] !== undefined && values[4] !== null && values[4] === "1") ? 1 : 0}, ${(values[5] !== undefined && values[5] !== null && values[5] === "1") ? 1 : 0}, ${(values[6] !== undefined && values[6] !== null && values[6] === "1") ? 1 : 0}, ${(values[7] !== undefined && values[7] !== null && values[7] === "1") ? 1 : 0}, ${escape(values[8])}, ${escape(values[9])})`;
    }
}