"use client";
import React, { useState } from "react";
import { HomePageModel } from "../_domain/model/home-page.model";
import CustomPortableText from "../common/components/text/CustomPortableText";
import ResponsiveImage from "../common/components/img/ResponsiveImage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  data: HomePageModel;
}

const HomeGalleryLightBoxSection = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = data.gallery.list_images.map((img) => ({
    src: img.media.url,
    alt: img.alt?.altText || "",
  }));

  return (
    <section className="section__gallery" id="Gallery">
      <div className="column__1">
        <CustomPortableText
          hasImg={false}
          data={data.gallery.list_block_title_gallery_galleryTitle}
        />

        <ul>
          {images.map((item, idx) => (
            <li key={idx}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
                aria-label={`Ver imagen ${idx + 1} en grande`}
              >
                <ResponsiveImage imageData={data.gallery.list_images[idx]} />
              </button>
            </li>
          ))}
        </ul>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images}
          index={index}
          on={{ view: ({ index }) => setIndex(index) }}
        />
      </div>
    </section>
  );
};

export default HomeGalleryLightBoxSection;
