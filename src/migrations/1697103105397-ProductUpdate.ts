import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductUpdate1697103105397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE product
      ADD COLUMN is_popular BOOLEAN;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE product
      DROP COLUMN is_popular;
    `);
  }
}
