import {MigrationInterface, QueryRunner} from "typeorm";

export class initTable1684822479561 implements MigrationInterface {
    name = 'initTable1684822479561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`roleType\` enum ('a', 'u') NOT NULL, \`emailVerifiedAt\` datetime NOT NULL, \`password\` varchar(255) NOT NULL, \`rememberToken\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`listings\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` bigint UNSIGNED NOT NULL, \`name\` varchar(255) NOT NULL, \`latitude\` double(20,6) NOT NULL, \`longitude\` double(20,6) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD CONSTRAINT \`FK_45d5c4642c4cad0229da0ec22e7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`listings\` DROP FOREIGN KEY \`FK_45d5c4642c4cad0229da0ec22e7\``);
        await queryRunner.query(`DROP TABLE \`listings\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
