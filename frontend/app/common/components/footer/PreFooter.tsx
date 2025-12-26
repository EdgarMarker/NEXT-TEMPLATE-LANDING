import "./footer.css";
import { CompanyModel } from "@/app/_domain/model/company.model";
import { getCompanyData } from "@/app/_domain/services/company.services";
import { createContract } from "@/app/common/utils/helper-contract";
import HubspotForm from "../form/HubspotForm";

const PreFooter = async () => {
  const data = await createContract(getCompanyData, CompanyModel);
  if (!data) return null;
  return (
    <section className="section__prefooter">
      <div className="column__2">
        <div className="col__left">
          <h3>CONTACTO</h3>
          <h2>Quiero saber de tus proyectos. ¡Hablemos!</h2>

          <ul role="list">
            <li>
              <a
                href={`tel:${data.contact.string_line_contact_phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.string_line_contact_phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${data.contact.string_line_contact_email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.string_line_contact_email}
              </a>
            </li>
            <li>
              <a
                href={data.location.url_location_googleMaps}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.string_line_contact_address}
              </a>
            </li>
            <li>
              {data.social.arr_list.map((social, idx) => (
                <a href={social.url_social_url} key={idx ?? ""}>
                  {social.string_line_social_name}
                </a>
              ))}
            </li>
          </ul>
        </div>
        <div className="col__right">
          <HubspotForm />
        </div>
      </div>
    </section>
  );
};

export default PreFooter;
