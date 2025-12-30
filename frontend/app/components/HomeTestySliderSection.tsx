"use client";
// @ts-expect-error no types
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef } from "react";
import CustomPortableText from "../common/components/text/CustomPortableText";
import { HomePageModel } from "../_domain/model/home-page.model";
import TestyCard from "../common/components/card/TestyCard";

interface Props {
  data: HomePageModel;
}

const HomeTestySliderSection = ({ data }: Props) => {
  const mainSliderRef = useRef<any>(null);
  const splideOptions: any = {
    perPage: 3,
    arrows: false,
    pagination: false,
    drag: true,
    autoplay: false,
    gap: "5vh",
  };

  const handlePrev = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.splide.go("<");
    }
  };

  const handleNext = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.splide.go(">");
    }
  };

  return (
    <section className="section__rProducts">
      <div className="column__2 ">
        <div className="col__left">
          <CustomPortableText
            hasImg={false}
            data={data.testy.list_block_title_testy_testyTitle}
          />
        </div>
        <div className="col__right">
          <div className="panel__slide">
            <button type="button" className="slide__prev" onClick={handlePrev}>
              {"<<"}
            </button>
            <button type="button" className="slide__next" onClick={handleNext}>
              {">>"}
            </button>
          </div>
        </div>
      </div>

      <div className="column__1">
        <Splide ref={mainSliderRef} options={splideOptions}>
          {data.testy.list_ref_testy_testyList.map((product, idx) => (
            <SplideSlide key={idx ?? ""}>
              <TestyCard data={product} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default HomeTestySliderSection;
