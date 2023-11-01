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
  res.json({
    message: "[POST] Hello world!",
  });
};
