"use client";
import "./button.css";
import { CompanyModel } from "@/app/_domain/model/company.model";
import { useAnalytics } from "../../utils/AnalyticsProvider";

interface Props {
  data: CompanyModel;
}

const WAButton = ({ data }: Props) => {
  const { track } = useAnalytics();

  const number = data.contact.string_line_contact_line_contact_wa.replace(
    /\D/g,
    ""
  );
  const handleClick = () => {
    track("Contact");
  };

  return (
    <div className="btn__wa">
      <a
        href={`https://wa.me/+52${number}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir a WhatsApp"
        onClick={handleClick}
      >
        <img src="/svg/whatsapp.svg" alt="icono-whatsapp" />
      </a>
    </div>
  );
};

export default WAButton;
