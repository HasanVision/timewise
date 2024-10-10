/*
  Warnings:

  - You are about to drop the column `city_code` on the `IPInfo` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `IPInfo` table. All the data in the column will be lost.
  - You are about to drop the column `timezone_name` on the `IPInfo` table. All the data in the column will be lost.
  - Added the required column `country_name` to the `IPInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `IPInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IPInfo` DROP COLUMN `city_code`,
    DROP COLUMN `postal_code`,
    DROP COLUMN `timezone_name`,
    ADD COLUMN `asn` VARCHAR(191) NULL,
    ADD COLUMN `continent_code` VARCHAR(191) NULL,
    ADD COLUMN `country_area` DOUBLE NULL,
    ADD COLUMN `country_calling_code` VARCHAR(191) NULL,
    ADD COLUMN `country_capital` VARCHAR(191) NULL,
    ADD COLUMN `country_code_iso3` VARCHAR(191) NULL,
    ADD COLUMN `country_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `country_population` INTEGER NULL,
    ADD COLUMN `country_tld` VARCHAR(191) NULL,
    ADD COLUMN `currency_name` VARCHAR(191) NULL,
    ADD COLUMN `network` VARCHAR(191) NULL,
    ADD COLUMN `utc_offset` VARCHAR(191) NULL,
    ADD COLUMN `version` VARCHAR(191) NOT NULL;
