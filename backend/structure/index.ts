import {
  FaComment,
  FaDesktop,
  FaNewspaper,
  FaRegBuilding,
  FaStore,
  FaTags,
  FaUser,
} from 'react-icons/fa'
import {MdIntegrationInstructions} from 'react-icons/md'
import type {StructureResolver} from 'sanity/structure'
import {MAGIC_TITLE} from '../schemaTypes/pages'
import { BiSolidDrink } from "react-icons/bi";

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .icon(FaDesktop)
        .title('Inicio')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      //----------------------------------------------
      S.divider(),
      //----------------------------------------------
      S.listItem()
        .icon(FaStore)
        .title('Lista de Productos')
        .child(
          S.documentTypeList(MAGIC_TITLE.toLowerCase())
            .title('Lista de Productos')
            .filter(`_type == "${MAGIC_TITLE.toLowerCase()}"`),
        ),
      S.listItem()
        .icon(FaComment)
        .title('Lista de Testimonios')
        .child(
          S.documentTypeList('testimonial')
            .title('Lista de Testimonios')
            .filter('_type == "testimonial"'),
        ),
      S.listItem()
        .icon(BiSolidDrink)
        .title('Lista de Amenidades')
        .child(
          S.documentTypeList('amenity').title('Lista de Amenidades').filter('_type == "amenity"'),
        ),
      //----------------------------------------------
      S.divider(),
      //----------------------------------------------
      S.listItem()
        .icon(FaRegBuilding)
        .title('Empresa')
        .child(S.document().title('Empresa').schemaType('company').documentId('company')),
      S.listItem()
        .icon(MdIntegrationInstructions)
        .title('Marketing')
        .child(S.document().title('Marketing').schemaType('marketing').documentId('marketing')),
    ])
