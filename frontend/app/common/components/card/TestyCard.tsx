import { TestimonialModel } from "@/app/_domain/model/home-page.model";
import "./card.css";
import React from "react";

interface StarRatingProps {
  grade: number;
  max?: number;
}

interface Props {
  data: TestimonialModel;
}

const StarRating = ({ grade, max = 5 }: StarRatingProps) => {
  const percent = Math.max(0, Math.min(grade / max, 1)) * 100;

  return (
    <div
      style={{
        position: "relative",
        width: 100,
        height: 20,
        display: "inline-block",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
        }}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starId = `star-background-${i}`;
          return (
            <svg
              key={starId}
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="var(--color-primary)"
            >
              <title>{`Background star ${i + 1}`}</title>
              <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
            </svg>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${percent}%`,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starId = `star-foreground-${i}`;
          return (
            <svg
              key={starId}
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="var(--color-secondary)"
            >
              <title>{`Foreground star ${i + 1}`}</title>
              <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

const TestyCard = ({ data }: Props) => {
  return (
    <div className="card card__testy">
      <div>
        <p>{data.string_textarea_testimonial_content}</p>
      </div>
      <div>
        <h4>{data.string_line_testimonial_authorName}</h4>
        <StarRating grade={Number(data.grade)} />
      </div>
    </div>
  );
};

export default TestyCard;
