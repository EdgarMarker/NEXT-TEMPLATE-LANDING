import { createSection } from "../utils/helper-createSection";
import {
	image,
	listBlockText,
	number,
	stringText,
	url,
} from "./modules/modules";

const SECTIONS = [
	{
		group: { name: "general", title: "Información General" },
		fields: [
			stringText({
				type: "line",
				context: "general",
				purpose: "name",
				title: "Nombre de la empresa",
			}),
			image({
				type: "icon",
				context: "general",
				purpose: "navLogo",
				title: "Logo de la empresa",
			}),
			stringText({
				type: "line",
				context: "general",
				purpose: "brand",
				title: "Marca de la empresa",
			}),
			stringText({
				type: "line",
				context: "general",
				purpose: "slogan",
				title: "Slogan de la empresa",
			}),
			image({
				type: "icon",
				context: "general",
				purpose: "footerLogo",
				title: "Logo de pie de página",
			}),
		],
	},
	{
		group: { name: "contact", title: "Contacto" },
		fields: [
			stringText({
				type: "textarea",
				context: "contact",
				purpose: "hours",
				title: "Horario de atención",
			}),
			stringText({
				type: "line",
				context: "contact",
				purpose: "email",
				title: "Email de contacto",
			}),
			stringText({
				type: "line",
				context: "contact",
				purpose: "phone",
				title: "Teléfono de contacto",
			}),
			stringText({
				type: "line",
				context: "contact",
				purpose: "line_contact_wa",
				title: "Línea de contacto de WhatsApp",
			}),
			stringText({
				type: "line",
				context: "contact",
				purpose: "address",
				title: "Dirección de la empresa",
			}),
		],
	},
	{
		group: { name: "location", title: "Ubicación" },
		fields: [
			url({
				context: "location",
				purpose: "googleMaps",
				title: "Enlace de dirección a Google Maps",
			}),
			number({
				title: "Latitud de la ubicación en Google Maps",
				context: "location",
				purpose: "latitude",
			}),
			number({
				title: "Longitud de la ubicación en Google Maps",
				context: "location",
				purpose: "longitude",
			}),
		],
	},
	{
		group: { name: "social", title: "Redes Sociales" },
		fields: [
			{
				name: "arr_list",
				title: "Lista de redes sociales",
				type: "array",
				of: [
					{
						type: "object",
						fields: [
							stringText({
								type: "line",
								context: "social",
								purpose: "name",
							}),
							url({ context: "social", purpose: "url" }),
							image({ type: "icon", context: "social", purpose: "icon" }),
						],
					},
				],
			},
		],
	},
	{
		group: { name: "policy", title: "Aviso de privacidad" },
		fields: [
			listBlockText({
				type: "post",
					context: "policy",
					purpose: "privacyNotice",
					title: "Aviso de privacidad",
				}),
			],
		},
	];

	export const company = {
		name: "company",
		type: "document",
		groups: [...SECTIONS.map(({ group }) => group)],
		fields: [
			...SECTIONS.map(({ group, fields }) => createSection(group, fields)),
		],
		preview: {
			select: {
				title: "general.string_line_general_name",
				media: "general.icon_general_navLogo",
			},
		},
	};
