import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from "@medusajs/medusa/dist/api/routes/admin/products/update-product";
import { IsBoolean, IsOptional } from "class-validator";

export class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
  @IsBoolean()
  @IsOptional()
  is_popular: boolean;
}
