"use client";
// @ts-expect-error no types
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState, useRef, useEffect } from "react";
import { HomePageModel } from "../_domain/model/home-page.model";
import CustomPortableText from "../common/components/text/CustomPortableText";
import ResponsiveImage from "../common/components/img/ResponsiveImage";

interface Props {
  data: HomePageModel;
}

const HomeModelsSection = ({ data }: Props) => {
  const models = data.models.list_ref_models_modelsList || [];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sliderRef = useRef<any>(null);
  const galleryRefs = useRef<any[]>([]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.splide.go(selectedIdx);
    }
  }, [selectedIdx]);

  const handlePrev = () => {
    const gallery = galleryRefs.current[selectedIdx];
    if (gallery) {
      gallery.splide.go("<");
    }
  };

  const handleNext = () => {
    const gallery = galleryRefs.current[selectedIdx];
    if (gallery) {
      gallery.splide.go(">");
    }
  };

  const splideMainOptions = {
    arrows: false,
    pagination: false,
    drag: false,
    gap: "2rem",
    speed: 600,
  };

  const splideGalleryOptions: any = {
    perPage: 1,
    arrows: false,
    pagination: false,
    drag: true,
    autoplay: false,
    gap: "5vh",
  };

  return (
    <section className="section__models" id="Models">
      <div className="column__1">
        <CustomPortableText
          hasImg={false}
          data={data.models.list_block_title_models_modelsTitle}
        />
      </div>
      <div className="column__1">
        <div className="models-tabs">
          {models.map((model, idx) => (
            <button
              key={idx}
              className={`tab-btn${selectedIdx === idx ? " active" : ""}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {model.general.string_line_general_category}
            </button>
          ))}
        </div>
      </div>
      <Splide options={splideMainOptions} ref={sliderRef}>
        {models.map((model, idx) => (
          <SplideSlide key={idx}>
            <div className="column__2">
              <div className="col__left">
                <h3>{model.general.string_line_general_title}</h3>
                <span>{model.general.string_line_general_category}</span>
                <CustomPortableText
                  hasImg={false}
                  data={model.general.list_block_title_general_description}
                />
              </div>
              <div className="col__right">
                <div className="panel__slide">
                  <button
                    type="button"
                    className="slide__prev"
                    onClick={handlePrev}
                  >
                    {"<<"}
                  </button>
                  <button
                    type="button"
                    className="slide__next"
                    onClick={handleNext}
                  >
                    {">>"}
                  </button>
                </div>
                <Splide
                  ref={(el) => (galleryRefs.current[idx] = el)}
                  options={splideGalleryOptions}
                >
                  {model.general.list_gallery.map((product, imgIdx) => (
                    <SplideSlide key={imgIdx}>
                      <ResponsiveImage imageData={product} />
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default HomeModelsSection;
