import {createSection} from '../../../utils/helper-createSection'
import {image, listBlockText, SEO, slug, stringText} from '../../modules/modules'

export const MAGIC_TITLE = 'Producto'

const SECTIONS = [
  {
    group: {name: 'general', title: 'General'},
    fields: [
      stringText({
        type: 'line',
        context: 'general',
        purpose: 'title',
        title: `Titulo del ${MAGIC_TITLE}`,
      }),
      stringText({
        type: 'line',
        context: 'general',
        purpose: 'category',
        title: `Categoría del ${MAGIC_TITLE}`,
      }),
      listBlockText({
        type: 'title',
        context: 'general',
        purpose: 'description',
        title: `Descripción "Completa" de ${MAGIC_TITLE}`,
      }),
      {
        name: 'list_gallery',
        title: 'Galería de Imágenes',
        type: 'array',
        of: [{type: 'image'}],
        options: {layout: 'grid'},
      },
    ],
  },
]

export const product = {
  name: `${MAGIC_TITLE.toLowerCase()}`,
  type: 'document',
  groups: [...SECTIONS.map(({group}) => group)],
  fields: [...SECTIONS.map(({group, fields}) => createSection(group, fields))],
  preview: {
    select: {
      title: 'general.string_line_general_title',
      subtitle: 'general.string_line_general_category',
      media: 'general.list_gallery.0',
    },
  },
}
