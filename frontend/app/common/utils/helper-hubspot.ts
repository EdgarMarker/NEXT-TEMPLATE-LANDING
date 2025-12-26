import { z } from "zod";

interface FormField {
  name: string;
  hubspotName: string;
  required: boolean;
  max?: number;
  label?: string;
  type?: string;
  options?: { value: string; label: string }[];
}

export interface FormConfig {
  id: string;
  fields: FormField[];
  schema: z.ZodSchema;
}

const baseFields = {
  firstname: {
    name: "firstname",
    hubspotName: "firstname",
    required: true,
    max: 100,
    label: "Nombre",
    type: "text",
  },
  lastname: {
    name: "lastname",
    hubspotName: "lastname",
    required: true,
    max: 100,
    label: "Apellido",
    type: "text",
  },
  email: {
    name: "email",
    hubspotName: "email",
    required: true,
    max: 100,
    label: "Correo electrónico",
    type: "email",
  },
  phone: {
    name: "phone",
    hubspotName: "phone",
    required: true,
    max: 50,
    label: "Teléfono",
    type: "tel",
  },
  city: {
    name: "city",
    hubspotName: "city",
    required: true,
    max: 100,
    label: "Ciudad",
    type: "text",
  },
  message: {
    name: "message",
    hubspotName: "message",
    required: false,
    max: 500,
    label: "Comentarios",
    type: "textarea",
  },
} as const;

const baseSchema = {
  firstname: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  message: z.string().optional(),
};

// FACTORY FUNCTION
const createFormConfig = (
  id: string,
  customFields: FormField[] = [],
  customSchema: Record<string, z.ZodTypeAny> = {}
): FormConfig => ({
  id,
  fields: [
    baseFields.firstname,
    baseFields.lastname,
    baseFields.email,
    baseFields.phone,
    baseFields.city,
    ...customFields,
    baseFields.message,
  ],
  schema: z.object({ ...baseSchema, ...customSchema }),
});

// FORM INSTANCES
export const FORM_INSTANCES = {
  get CONTACT() {
    return createFormConfig(
      "contact_form",
      [
        {
          name: "interest",
          hubspotName: "interest",
          required: true,
          label: "Interesado en",
          type: "select",
          options: [
            { value: "option_1", label: "Propiedades en venta" },
            { value: "option_2", label: "Propiedades en renta" },
            { value: "option_3", label: "Atención a foráneos" },
          ],
        },
      ],
      {
        interest: z.string().min(1, "Por favor selecciona una opción"),
      }
    );
  },
  get PRODUCT() {
    return createFormConfig(
      "product_form",
      [
        {
          name: "id_propiedad",
          hubspotName: "id_propiedad",
          required: true,
          label: "ID del Producto",
          type: "text",
        },
      ],
      {
        id_propiedad: z
          .string()
          .min(2, "El ID del producto debe tener al menos 2 caracteres"),
      }
    );
  },
};

export const createFormInstance = createFormConfig;
