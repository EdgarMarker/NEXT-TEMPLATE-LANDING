interface Props {
  title?: string
  dsc?: string
  context: string
  purpose: string
}

//*! ----- List block [] -----

export const listBlockText = ({
  type,
  context,
  purpose,
  title,
  dsc,
}: {
  type: 'title' | 'post'
} & Props) => {
  return {
    name: `list_block_${type}_${context}_${purpose}`,
    title:
      type === 'title'
        ? title || 'Titular'
        : type === 'post'
          ? title || 'Contenido del artículo'
          : title || 'Información adicional "Dinámica"',
    description:
      type === 'title'
        ? dsc || 'Usar negritas para resaltar el texto diseñado'
        : type === 'post'
          ? dsc || 'Texto del artículo principal'
          : dsc || "Texto de apoyo o información adicional 'Dinámica'",
    type: 'array',
    of: [{type: 'block'}, ...(type === 'post' ? [{type: 'image'}] : [])],
  }
}

//*! ----- Strings "" -----

export const stringText = ({
  type,
  context,
  purpose,
  title,
}: {
  type: 'line' | 'textarea'
} & Props) => {
  return {
    name: `string_${type}_${context}_${purpose}`,
    title: type === 'line' ? title || 'Linea de texto' : title || 'Área de texto',
    type: type === 'line' ? 'string' : 'text',
  }
}

export const stringH1 = () => {
  return {
    name: `string_h1`,
    title: 'Titular web',
    description: 'Este es el titular principal de la página para SEO',
    type: 'string',
  }
}

//*! ----- URL url() -----

export const url = ({context, purpose, title, dsc}: Props) => {
  return {
    name: `url_${context}_${purpose}`,
    title: title || 'Enlace externo',
    description: dsc || 'Enlace externo a otra web',
    type: 'url',
  }
}

//*! ----- Images -----

export const image = ({
  type,
  context,
  purpose,
  title,
  dsc,
}: {
  type: 'img' | 'icon'
} & Props) => {
  return {
    name: `${type}_${context}_${purpose}`,
    title: type === 'img' ? title || 'Imagen' : title || 'Icono',
    description: type === 'img' ? dsc || 'Imagen de contenido' : dsc || 'Icono de contenido',
    type: 'image',
  }
}

//*! ----- Numbers 123 -----

export const number = ({context, purpose, title}: Props) => {
  return {
    name: `number_${context}_${purpose}`,
    title: title,
    type: 'number',
  }
}

export const slug = ({value}: {value: string}) => {
  return {
    name: `slug`,
    title: 'Slug',
    type: 'slug',
    options: {
      source: value,
      maxLength: 96,
    },
  }
}

//*! ----- BOOLEAN -----
export const bool = ({context, purpose, title}: Props) => {
  return {
    name: `bool_${context}_${purpose}`,
    title: title,
    type: 'boolean',
  }
}

//*! ----- REFERENCES -----

export const reference = ({
  context,
  purpose,
  to,
  title,
  isArray = false,
}: {
  to: string | string[]
  isArray?: boolean
} & Props) => {
  const types = Array.isArray(to) ? to : [to]

  const referenceConfig = {
    type: 'reference',
    to: types.map((type) => ({type})),
  }

  if (isArray) {
    return {
      name: `list_ref_${context}_${purpose}`,
      title: title || 'Referencia',
      type: 'array',
      of: [referenceConfig],
    }
  }

  return {
    name: `ref_${context}_${purpose}`,
    title: title || 'Referencia',
    ...referenceConfig,
  }
}

//*! ----- COMPONENTS -----

export const SEO = () => {
  return {
    name: 'seo',
    title: 'SEO',
    group: 'seo',
    type: 'object',
    fields: [
      {
        name: 'string_titleSeo',
        title: 'Título para posicionar esta página en buscadores',
        type: 'string',
        description:
          '*Quedará oculto a la vista del usuario, exclusivo para SEO (Max caracteres 70)',

        validation: (rule: any) =>
          rule.max(70).warning('Se han rebasado los 70 caracteres recomendados'),
      },
      {
        name: 'text_descSeo',
        title: 'Descripción para posicionar esta página en buscadores',
        type: 'text',
        description:
          '*Quedará oculto a la vista del usuario, exclusivo para SEO (Max caracteres 155)',

        validation: (rule: any) =>
          rule.max(155).warning('Se han rebasado los 155 caracteres recomendados'),
      },
      {
        name: 'text_keySeo',
        title: 'Palabras clave para posicionar esta página en buscadores',
        type: 'text',
        description: '*Separar palabras con comas',
      },
    ],
  }
}

export const HERO = () => {
  return {
    name: 'hero',
    title: 'Cabecera de la web',
    group: 'hero',
    type: 'object',
    fields: [
      stringH1(),
      listBlockText({type: 'title', context: 'hero', purpose: 'title'}),
      stringText({
        type: 'line',
        context: 'hero',
        purpose: 'button',
        title: 'Texto del botón (CTA opcional)',
      }),
      image({
        type: 'img',
        context: 'hero',
        purpose: 'banner',
        title: 'Imagen de la cabecera',
      }),
    ],
  }
}
