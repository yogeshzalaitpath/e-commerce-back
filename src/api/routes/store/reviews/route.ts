import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ProductReview } from "../../../../models/product-review";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const productReviewRepo = manager.getRepository(ProductReview);

  return res.json({
    product_reviews: await productReviewRepo.find(),
  });
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const productReviewRepo = manager.getRepository(ProductReview);

  
  
  const { title, description, rating, product_id, customer_id } = req.body

  const newProductReview = new ProductReview();
  newProductReview.title = title;
  newProductReview.description = description;
  newProductReview.rating = rating;
  newProductReview.product = product_id;
  newProductReview.customer = customer_id;
  console.log('req.body', req.body)
  const finalData = await productReviewRepo.save(newProductReview)
  return res.json({
    product_review: finalData
  });
};
