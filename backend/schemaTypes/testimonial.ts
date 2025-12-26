import { stringText } from "./modules/modules";

export const testimonial = {
	name: "testimonial",
	type: "document",
	fields: [
		stringText({
			type: "line",
			context: "testimonial",
			purpose: "authorName",
			title: "Nombre del autor",
		}),
		stringText({
			type: "line",
			context: "testimonial",
			purpose: "authorLocation",
			title: "Ubicación del comentario",
		}),
		stringText({
			type: "textarea",
			context: "testimonial",
			purpose: "content",
			title: "Testimonio",
		}),
		{
			title: "Calificación",
			name: "grade",
			type: "string",
			options: {
				list: [
					{ title: "0", value: "0" },
					{ title: "0.5", value: "10" },
					{ title: "1.0", value: "20" },
					{ title: "1.5", value: "30" },
					{ title: "2.0", value: "40" },
					{ title: "2.5", value: "50" },
					{ title: "3.0", value: "60" },
					{ title: "3.5", value: "70" },
					{ title: "4.0", value: "80" },
					{ title: "4.5", value: "90" },
					{ title: "5.0", value: "100" },
				],
			},
		},
	],
	preview: {
		select: {
			title: "string_line_testimonial_authorName",
		},
	},
};
