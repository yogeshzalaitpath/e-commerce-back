import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductReview1698656083953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "product_review" (
                "id" character varying NOT NULL,
                "title" character varying NOT NULL,
                "description" text,
                "product_id" character varying NOT NULL,
                "customer_id" character varying NOT NULL,
                "rating" double precision NOT NULL,
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_830cb23b693ad178cb48d74b82e" PRIMARY KEY ("id")
            );
            ALTER TABLE "product_review" ADD CONSTRAINT "FK_854eb524947ef5824de1b87745f" FOREIGN KEY ("product_id") REFERENCES "product"("id");
            ALTER TABLE "product_review" ADD CONSTRAINT "FK_6207f20c64f641eb0d3da0c3c98" FOREIGN KEY ("customer_id") REFERENCES "customer"("id");
        `);

        await queryRunner.query(`
            CREATE TABLE "product_review_images" (
                "product_review_id" character varying NOT NULL,
                "image_id" character varying NOT NULL,
                CONSTRAINT "PK_e4d7eae156bd592fed8547c2c33" PRIMARY KEY ("product_review_id", "image_id")
            );
            ALTER TABLE "product_review_images" ADD CONSTRAINT "FK_57500e62e53dbb27f3f201e5276" FOREIGN KEY ("product_review_id") REFERENCES "product_review"("id") ON DELETE CASCADE;
            ALTER TABLE "product_review_images" ADD CONSTRAINT "FK_634a7d176d8ca1263a67407ed07" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_review_images"`);
        await queryRunner.query(`DROP TABLE "product_review"`);
    }

}
