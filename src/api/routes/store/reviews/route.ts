import { Customer, type MedusaRequest, type MedusaResponse } from "@medusajs/medusa";
import { ProductReview } from "../../../../models/product-review";
import { EntityManager, MoreThan } from "typeorm";
import ImageRepository from "@medusajs/medusa/dist/repositories/image";
import { FileService } from "medusa-interfaces";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const productReviewRepo = manager.getRepository(ProductReview);

  const [productReviews, counts] = await Promise.all([
    productReviewRepo.find(), // Fetch all data
    productReviewRepo
      .createQueryBuilder('product_review')
      .select([
        'COUNT(CASE WHEN product_review.rating = 1 THEN 1 ELSE NULL END) AS count1',
        'COUNT(CASE WHEN product_review.rating = 2 THEN 1 ELSE NULL END) AS count2',
        'COUNT(CASE WHEN product_review.rating = 3 THEN 1 ELSE NULL END) AS count3',
        'COUNT(CASE WHEN product_review.rating = 4 THEN 1 ELSE NULL END) AS count4',
        'COUNT(CASE WHEN product_review.rating = 5 THEN 1 ELSE NULL END) AS count5',
      ])
      .getRawOne(),
  ]);
  
  const totalCount = productReviews.length

  return res.json({
    product_reviews: productReviews,
    totalCount: totalCount,
    RatingCounts: counts,
  });
};


export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const productReviewRepo = manager.getRepository(ProductReview);
  const customerRepo = manager.getRepository(Customer)
  const imageRepo = manager.withRepository(ImageRepository)

  const { title, description, rating, product_id, customer_id, images } = req.body
  const newImage = await imageRepo.upsertImages([images])
  const data = await customerRepo.findOne({
    where: {
      id: customer_id,
    },
  })
  const username = data.first_name + " " + data.last_name
 
  const newProductReview = new ProductReview();
  newProductReview.title = title;
  newProductReview.description = description;
  newProductReview.rating = rating;
  newProductReview.product = product_id;
  newProductReview.customer = customer_id;
  newProductReview.images = newImage;


 
  const finalData = await productReviewRepo.save(newProductReview)

  return res.json({
    product_review: finalData,
    username: username
  });
};
