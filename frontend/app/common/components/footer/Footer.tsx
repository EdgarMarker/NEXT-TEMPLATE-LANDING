import "./footer.css";
import { NAV_ITEMS } from "@/app/common/utils/constants";
import { createContract } from "../../utils/helper-contract";
import { getCompanyData } from "@/app/_domain/services/company.services";
import { CompanyModel } from "@/app/_domain/model/company.model";
import ResponsiveImage from "../img/ResponsiveImage";

export default async function Footer() {
  const data = await createContract(getCompanyData, CompanyModel);
  if (!data) return;

  return (
    <footer>
      <div className="column__2">
        <div className="col__left">
          <div className="foot__item">
            <h3>Mapa del sitio</h3>
            <ul role="list">
              {NAV_ITEMS.map((item) => {
                return (
                  <li key={item.href}>
                    <a href={item.href}>{item.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="foot__item">
            <h3>Síguenos en</h3>
            <ul role="list">
              {data.social.arr_list.map((item, index) => (
                <li key={index ?? ""}>
                  <a href={item.url_social_url} target="_blank">
                    {item.string_line_social_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col__right">
          <a href={"/"}>
            <ResponsiveImage
              imageData={data.general.icon_general_footerLogo}
              variant="icon"
            />
          </a>
        </div>
      </div>

      <div className="column__1">
        <span>
          {data.general.string_line_general_name} ® Todos los derechos
          reservados. <a href="/aviso-de-privacidad">Aviso de Privacidad</a>.
          Sitio web creado por{" "}
          <a
            href="https://marker.com.mx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marker Branding
          </a>
        </span>
      </div>
    </footer>
  );
}
