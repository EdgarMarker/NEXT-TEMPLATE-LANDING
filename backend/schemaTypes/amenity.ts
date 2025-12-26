import { defineField, defineType } from "sanity";
import { lucideMap } from "../utils/icons/lucide-map";
import IconPicker from "./components/IconPicker";

export const amenity = defineType({
	name: "amenity",
	title: "Amenidad",
	type: "document",
	preview: {
		select: {
			title: "name",
			iconName: "iconName",
			iconSet: "iconSet",
			customIcon: "customIcon",
		},
		prepare({ title, iconName, iconSet, customIcon }) {
			const Icon =
				iconSet === "lucide" && iconName ? lucideMap[iconName] : null;

			return {
				title: title || "Sin nombre",
				media: Icon ? Icon : customIcon,
			};
		},
	},
	fields: [
		defineField({
			name: "name",
			title: "Nombre",
			type: "string",
		}),
		defineField({
			name: "iconSet",
			title: "Tipo de ícono",
			type: "string",
			options: {
				list: [
					{ title: "Lucide", value: "lucide" },
					{ title: "SVG Personalizado", value: "custom" },
				],
				layout: "radio",
			},
			initialValue: "lucide",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "iconName",
			title: "Ícono",
			type: "string",
			components: {
				input: IconPicker,
			},
			hidden: ({ parent }) => parent?.iconSet !== "lucide",
			validation: (Rule) =>
				Rule.custom((val, { parent }) =>
					(parent as any)?.iconSet === "lucide" && !val
						? "Selecciona un ícono"
						: true,
				),
		}),
		defineField({
			name: "customIcon",
			title: "Ícono Personalizado",
			type: "image",
			hidden: ({ parent }) => parent?.iconSet !== "custom",
			validation: (Rule) =>
				Rule.custom((val, { parent }) =>
					(parent as any)?.iconSet === "custom" && !val
						? "Selecciona un ícono"
						: true,
				),
		}),
	],
});
