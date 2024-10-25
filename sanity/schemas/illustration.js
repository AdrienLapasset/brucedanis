import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export default {
  name: "illustration",
  title: "Illustrations",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "illustration", newItemPosition: "before" }),
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL de la page de l'illustration",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    },
    {
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "illustrationsBlock",
      title: "Bloc de l'illustration",
      description:
        "Les blocs contiennent une ou plusieurs illustrations et viennent se placer les uns au-dessus des autres. Par exmple, le premier bloc, le bloc 1, est en bas de la page, les blocs suivants étants au-dessus de lui.",
      type: "reference",
      to: [{ type: "illustrationsBlock" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Illustration principale",
      description: "Image de l'illustration visible sur la page d'accueil",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "gifImage",
      title: "GIF de l'illustration principale",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "position",
      title: "Position",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "columnStart",
          type: "number",
          title: "Commence à la colonne",
          options: {
            list: [1, 2, 3, 4, 5, 6, 7],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "columnEnd",
          type: "number",
          title: "Termine à la colonne",
          options: {
            list: [1, 2, 3, 4, 5, 6, 7],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "rowStart",
          type: "number",
          title: "Commence à la ligne",
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: "rowEnd",
          type: "number",
          title: "Termine à la ligne",
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: "titleImage",
      title: "Titre illustré",
      description: "Image du titre en calligraphie",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description (optionnel)",
      type: "text",
    },
    {
      name: "formats",
      title: "Tous les formats / couleurs disponibles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "technique",
              title: "Technique",
              description: "Technique utilisée qui apparaitra sous le titre",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "dimensions",
              title: "Dimensions",
              type: "string",
              description: 'Dimensions du format (ex : "10 x 20 cm")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "price",
              type: "number",
              title: "Prix",
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "paymentUrl",
              type: "url",
              title: "Lien vers la page de paiement",
              description: "À créer sur Stripe (mettre le même prix)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "soldOut",
              title: "Épuisé",
              type: "boolean",
              description: "Retire le bouton 'Commander' et affiche 'Épuisé'",
              initialValue: false,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
