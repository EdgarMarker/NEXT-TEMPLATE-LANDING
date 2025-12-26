import {createSection} from '../../../utils/helper-createSection'
import {HERO, image, listBlockText, reference, SEO} from '../../modules/modules'

const SECTIONS = [
  {
    group: {name: 'intro', title: 'Sección de Introducción'},
    fields: [
      listBlockText({
        type: 'title',
        context: 'intro',
        purpose: 'introTitle',
        title: 'Título de la Introducción y Información',
      }),
      image({
        type: 'img',
        context: 'intro',
        purpose: 'introImage',
        title: 'Imagen de la Introducción',
      }),
    ],
  },

  {
    group: {name: 'amenities', title: 'Sección de Amenidades'},
    fields: [
      listBlockText({
        type: 'title',
        context: 'amenities',
        purpose: 'amenitiesTitle',
        title: 'Título de la Amenidades y Información',
      }),
      reference({
        context: 'amenities',
        purpose: 'amenitiesList',
        title: 'Lista de Amenidades',
        isArray: true,
        to: 'amenity' as any,
      }),
    ],
  },

  {
    group: {name: 'location', title: 'Sección de Ubicación'},
    fields: [
      listBlockText({
        type: 'title',
        context: 'location',
        purpose: 'locationTitle',
        title: 'Título de la Ubicación y Información',
      }),
      image({
        type: 'img',
        context: 'location',
        purpose: 'svg',
        title: 'Imagen de la Ubicación',
      }),
      image({
        type: 'icon',
        context: 'location',
        purpose: 'pin',
        title: 'Pin del Mapa',
      }),
    ],
  },

  {
    group: {name: 'testy', title: 'Sección de Testimonios'},
    fields: [
      listBlockText({
        type: 'title',
        context: 'testy',
        purpose: 'testyTitle',
        title: 'Título de la Testimonios y Información',
      }),
      reference({
        context: 'testy',
        purpose: 'testyList',
        title: 'Lista de Testimonios',
        isArray: true,
        to: 'testimonial' as any,
      }),
    ],
  },

  {
    group: {name: 'gallery', title: 'Sección de Galería'},
    fields: [
      listBlockText({
        type: 'title',
        context: 'gallery',
        purpose: 'galleryTitle',
        title: 'Título de la Galería y Información',
      }),
      {
        name: 'list_images',
        title: 'Imágenes de la Galería',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
        options: {
          layout: 'grid',
        },
      },
    ],
  },
]

export const homePage = {
  name: 'homePage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Cabecera'},
    ...SECTIONS.map(({group}) => group),
    {name: 'seo', title: 'SEO'},
  ],
  fields: [HERO(), ...SECTIONS.map(({group, fields}) => createSection(group, fields)), SEO()],
  preview: {
    prepare() {
      return {
        title: 'Vista de Inicio',
      }
    },
  },
}
