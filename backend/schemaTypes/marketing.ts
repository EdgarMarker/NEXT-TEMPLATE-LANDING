import {createSection} from '../utils/helper-createSection'
import {bool, stringText} from './modules/modules'

const SECTIONS = [
  {
    group: {name: 'meta', title: 'Meta Facebook'},
    fields: [
      stringText({
        type: 'line',
        context: 'meta',
        purpose: 'pixelId',
        title: 'Pixel ID',
      }),
      stringText({
        type: 'line',
        context: 'meta',
        purpose: 'testEventCode',
        title: 'Test Event Code (Opcional)',
      }),
      bool({
        context: 'meta',
        purpose: 'enableCapi',
        title: 'Habilitar Conversions API (CAPI)',
      }),
    ],
  },
  {
    group: {name: 'google', title: 'Google'},
    fields: [
      stringText({
        type: 'line',
        context: 'google',
        purpose: 'gtmId',
        title: 'Google Tag Manager ID',
      }),
      stringText({
        type: 'line',
        context: 'google',
        purpose: 'apiMapsKey',
        title: 'Google Maps API Key',
      }),
    ],
  },
]

export const marketing = {
  name: 'marketing',
  type: 'document',
  groups: [...SECTIONS.map(({group}) => group)],
  fields: [...SECTIONS.map(({group, fields}) => createSection(group, fields))],
  preview: {
    prepare() {
      return {
        title: 'Vista de Marketing y Publicidad',
      }
    },
  },
}
