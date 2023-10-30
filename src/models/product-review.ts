
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Customer, Image, Product, SoftDeletableEntity } from "@medusajs/medusa"
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { Max, Min } from "class-validator"

@Entity()
export class ProductReview extends SoftDeletableEntity {

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToMany(() => Image, { cascade: ["insert"] })
  @JoinTable({
    name: 'product_review_images',
    joinColumn: { name: 'product_review_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'image_id', referencedColumnName: 'id' },
  })
  images: Image[];

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ type: "float" })
  @Min(1)
  @Max(5)
  rating: number

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "rev")
  }
}