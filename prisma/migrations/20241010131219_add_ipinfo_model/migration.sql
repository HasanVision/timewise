-- CreateTable
CREATE TABLE `IPInfo` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postal` VARCHAR(191) NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `timezone` VARCHAR(191) NOT NULL,
    `org` VARCHAR(191) NULL,
    `in_eu` BOOLEAN NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `region_code` VARCHAR(191) NULL,
    `city_code` VARCHAR(191) NULL,
    `postal_code` VARCHAR(191) NULL,
    `timezone_name` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NULL,
    `languages` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
