import { TransactionBaseService } from "@medusajs/medusa";

export default class ProductReviewService extends TransactionBaseService {
  getMessage() {
    return `Welcome to My Store!`;
  }
}
