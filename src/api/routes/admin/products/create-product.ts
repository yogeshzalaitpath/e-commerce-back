import { AdminPostProductsReq as MedusaAdminPostProductsReq } from "@medusajs/medusa/dist/api/routes/admin/products/create-product";
import { IsBoolean } from "class-validator";

export class AdminPostProductsReq extends MedusaAdminPostProductsReq {
  @IsBoolean()
  is_popular: boolean;
}
