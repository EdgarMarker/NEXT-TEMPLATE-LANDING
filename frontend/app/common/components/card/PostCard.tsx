import { PostModel } from "@/app/_domain/model/blog/post.model";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import Button from "../btn/Button";
type variants = "home" | "catalog";

interface Props {
  variant: variants;
  data: PostModel;
}
const PostCard = ({ data, variant }: Props) => {
  switch (variant) {
    case "home":
      return (
        <div className="card card__product--home">
          <div className="head">
            <span className="category">
              {data.general.ref_postCategory?.string_line_category_name}
            </span>
            <span className="author">
              {data.general.ref_postAuthor?.string_line_author_name}
            </span>
            <h4>{data.general.string_line_general_title}</h4>
            <p>{data.general.string_textarea_general_cardExcerpt}</p>
            <Button variant="link" href={`/blog/${data.general.slug.current}`}>
              Leer Más
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
      return (
        <li className="card card__post--catalog">
          <div className="head">
            <span className="category">
              {data.general.ref_postCategory?.string_line_category_name}
            </span>
            <span className="author">
              {data.general.ref_postAuthor?.string_line_author_name}
            </span>
            <h4>{data.general.string_line_general_title}</h4>
            <p>{data.general.string_textarea_general_cardExcerpt}</p>
            <Button variant="link" href={`/blog/${data.general.slug.current}`}>
              Leer Más
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

export default PostCard;
