import { ProductoModel } from "@/app/_domain/model/catalog/detail/product.model";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Button from "../btn/Button";

type variants = "home" | "catalog";
interface Props {
  variant?: variants;
  data: ProductoModel;
}

const ProductCard = ({ variant, data }: Props) => {
  switch (variant) {
    case "home":
      return (
        <div className="card card__product--home">
          <div className="head">
            <span className="category">
              <a
                href={`/productos/categoria/${data.general.ref_productCategory?.slug.current}`}
              >
                {data.general.ref_productCategory?.string_line_category_name}
              </a>
            </span>
            <h4>{data.general.string_line_general_title}</h4>
            <p>{data.general.string_textarea_general_cardExcerpt}</p>
            <Button
              variant="link"
              href={`/productos/${data.general.slug.current}`}
            >
              Ver producto
            </Button>
          </div>
          <div className="body">
            <ResponsiveImage
              imageData={data.general.img_general_primaryImg}
              variant="card"
            />
          </div>
        </div>
      );
    case "catalog":
    default:
      return (
        <li className="card card__product--catalog">
          <div className="head">
            <span className="category">
              <a
                href={`/productos/categoria/${data.general.ref_productCategory?.slug.current}`}
              >
                {data.general.ref_productCategory?.string_line_category_name}
              </a>
            </span>
            <h4>{data.general.string_line_general_title}</h4>
            <p>{data.general.string_textarea_general_cardExcerpt}</p>
            <Button
              variant="link"
              href={`/productos/${data.general.slug.current}`}
            >
              Ver producto
            </Button>
          </div>
          <div className="body">
            <ResponsiveImage
              imageData={data.general.img_general_primaryImg}
              variant="card"
            />
          </div>
        </li>
      );
  }
};

export default ProductCard;
