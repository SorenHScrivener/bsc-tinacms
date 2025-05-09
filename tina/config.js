import { defineConfig } from "tinacms";
import generateUniqueId from "generate-unique-id";
const id = generateUniqueId({
  length: 12,
  useLetters: false
});

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 6
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const sharedTemplates = [
  {
    name: "simpleCopy",
    label: "Simple Copy",
    ui: {
      itemProps: (item) => {
        return { label: item.subTitle }
      },
    },
    fields: [
      {
        type: 'boolean',
        name: 'isTextCentered',
        label: 'Center Text?',
        toggleLabels: {
          true: 'yes',
          false: 'No',
        },
        ui: {
          component: "toggle"
        }
      },
      {
        type: "string",
        name: "fontSizeLarge",
        label: "Font Size (Large Screen)",
        options: [
          { value: "text-base", label: "Base" },
          { value: "text-lg", label: "Large" },
          { value: "text-xl", label: "Extra Large" },
          { value: "text-2xl", label: "2X Large" },
          { value: "text-3xl", label: "3X Large" },
        ],
        ui: {
          component: "select",
        },
      },
      {
        type: "string",
        name: "subTitle",
        label: "Subtitle[optional]",
      },
      {
        type: "rich-text",
        // toolbarOverride: [],
        name: "copy",
        label: "Copy",
        isBody: true,
      }
    ]
  }
];

import { Slider } from "./Slider";
// import { stringify } from "querystring";

// later I can figure out how to make font work with tailwinds, that nothing requires a refresh, and seperate options out,
// and make sure the options are not repeated in the same section/consolidate everyhing where can
//also consider simpleCopy to be just paragraph to be inserted in any other thing as an option
//add a universal fonts and colors, with a checkbox by locals to default to them.

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID || '',
  // Get this from tina.io
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        allowedActions: {
          create: false,
          delete: false,
        },
        ui: {
          router: props => {
            if (props.document._sys.relativePath === 'BackStory-Capitals-Homepage.md') {
              return `/`;
            } else if (props.document._sys.relativePath === 'About-BackStory-Capital.md') {
              return `/about-us`;
            } else if (props.document._sys.relativePath === 'team.md') {
              return `/team`;
            } else if (props.document._sys.relativePath === 'our-process.md') {
              return `/our-process`;
            } else if (props.document._sys.relativePath === 'our-strategies.md') {
              return `/our-strategies`;
            } else if (props.document._sys.relativePath === 'blog-posts.md') {
              return `/blog-posts`;
            } else if (props.document._sys.relativePath === 'contact-us.md') {
              return `/contact-us`;
            } else if (props.document._sys.relativePath === 'privacy-policy.md') {
              return `/privacy-policy`;
            }
          },
          // allowedActions: {
          //   delete: false,
          //   create: false,
          // },
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title(Accessibility)",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            isTitle: true,
            required: true,
          },
          {
            name: "cover",
            label: "Cover",
            type: "object",
            fields: [
              {
                type: "string",
                name: "copy",
                label: "copy",
                isBody: true,
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "coverImage",
                label: "Cover Image",
              },
              {
                label: "Image Brightness",
                name: "brightness",
                type: "number",
                description: "determines the brightness of the image",
                ui: {
                  parse: (val) => Number(val),
                  component: Slider,
                  range: ['0', '100'],
                  steps: '1'
                }
              }
            ],
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item.sectionTitle }
              },
              defaultItem: {
                id: 'Id-' + id
              },
            },
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title(Accessibility)",
                isTitle: true,
                required: true,
              },
              {
                type: "boolean",
                name: "isTitleHidden",
                label: "Hide Title?",
                description: "Check to hide this section title",
                toggleLabels: {
                  true: 'yes',
                  false: 'No',
                },
                ui: {
                  component: "toggle"
                }
              },
              {
                type: "string",
                name: "id",
                label: "ID",
                ui: {
                  component: "hidden"
                }
              },
              {
                type: "object",
                name: "content",
                label: "Content",
                list: true,
                templates: [
                  ...sharedTemplates,
                  {
                    name: "splitContent",
                    label: "Split Content",
                    ui: {
                      itemProps: (item) => {
                        return { label: item.subTitle }
                      },
                    },
                    fields: [
                      {
                        type: 'string',
                        name: 'backgroundColor',
                        label: 'Background Color',
                        description: 'Edit the section background color here',
                        ui: {
                          component: 'color',
                          colorFormat: 'hex',
                          colors: [
                            '#8FB3EC',
                            '#D6E4F0',
                            '#171738',
                            '#B5C998',
                            '#95BB6A',
                            '#284F49',
                            '#1F3F3A'
                          ],
                          widget: 'block',
                        },
                      },
                      {
                        type: "boolean",
                        name: "isImageFirst",
                        label: "Image First?",
                        toggleLabels: {
                          true: 'yes',
                          false: 'No',
                        },
                        ui: {
                          component: "toggle"
                        }
                      },
                      {
                        type: "image",
                        name: "image",
                        label: "image",
                      },
                      {
                        type: "string",
                        name: "subTitle",
                        label: "Subtitle[optional]",
                      },
                      {
                        type: "rich-text",
                        toolbarOverride: [],
                        name: "copy",
                        label: "Copy",
                        isBody: true,
                      },
                    ]
                  },
                  {
                    name: "iconsArray",
                    label: "Icons Array",
                    ui: {
                      itemProps: (item) => {
                        return { label: item.subTitle }
                      },
                    },
                    fields: [
                      {
                        type: 'boolean',
                        name: 'addStatic',
                        label: 'Grid Type?',
                        ui: {
                          component: 'toggle',
                          toggleLabels: {
                            true: 'yes',
                            false: 'No',
                          },
                        }
                      },
                      {
                        type: "string",
                        name: "subTitle",
                        label: "Subtitle[optional]",
                      },
                      {
                        type: "object",
                        name: "icon",
                        label: "Icon",
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item.label }
                          },
                          defaultItem: {
                            label: "[business Type]",
                            image: "/Icons/first.webp"
                          },
                          // component:
                        },
                        fields: [
                          {
                            type: "string",
                            name: "label",
                            label: "Label",
                          },
                          {
                            type: "image",
                            name: "image",
                            label: "Image",
                          },
                          {
                            type: "string",
                            name: "imageSize",
                            label: "Image Size",
                            ui: {
                              component: "select",
                            },
                            options: [
                              {
                                value: "h-[6rem] md:h-[10rem] lg-tab:h-[6rem] w-auto",
                                label: "Standard Partner Logo",
                              },
                              {
                                value: "min-w-full w-[12rem] h-auto self-center lg:self-baseline",
                                label: "Wide Centered Logo",
                              },
                              {
                                value: "min-w-full w-[18rem] h-auto self-center lg:self-baseline",
                                label: "Extra Wide Centered Logo",
                              },
                              {
                                value: "w-[86%] h-auto self-center lg:self-baseline",
                                label: "Semi-Full Logo",
                              },
                              {
                                value: "w-full h-auto self-center lg:self-baseline",
                                label: "Full Logo",
                              },
                              {
                                value: "",
                                label: "No Extra Styling",
                              },
                            ],
                            required: false,
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "founderMessage",
                    label: "Founder Message",
                    ui: {
                      itemProps: (item) => {
                        return { label: item.subTitle }
                      },
                    },
                    fields: [
                      {
                        type: "image",
                        name: "image",
                        label: "image",
                      },
                      {
                        type: "rich-text",
                        toolbarOverride: [],
                        name: "copy",
                        label: "Copy",
                        isBody: true,
                      },
                      {
                        type: 'string',
                        name: 'regards',
                        label: 'Regards Text'
                      },
                      {
                        type: 'string',
                        name: 'signature',
                        label: 'Signature',
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "team",
                    label: "Team",
                    list: true,
                    ui: {
                      defaultItem() {
                        return {
                          backgroundColor: '#8FB3EC',
                        }
                      },
                    },
                    fields: [
                      {
                        type: 'object',
                        name: 'member',
                        label: 'Member',
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item.name }
                          },
                          defaultItem: {
                            name: 'Name',
                            title: 'Title',
                            img: '/team/placeholder.png'
                          }
                        },
                        fields: [
                          {
                            type: 'string',
                            name: 'backgroundColor',
                            label: 'Background Color',
                            description: 'Edit the section background color here',
                            ui: {
                              component: 'color',
                              colorFormat: 'hex',
                              colors: [
                                '#8FB3EC',
                                '#D6E4F0',
                                '#171738',
                                '#B5C998',
                                '#95BB6A',
                                '#284F49',
                                '#1F3F3A'
                              ],
                              widget: 'block',
                            },
                          },
                          {
                            type: "string",
                            name: "name",
                            label: "Name",
                          },
                          {
                            type: "string",
                            name: "title",
                            label: "Title",
                          },
                          {
                            type: "rich-text",
                            name: "bio",
                            label: "Bio",
                            isBody: true,
                          },
                          {
                            type: "image",
                            name: "image",
                            label: "Image",
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "cardsArray",
                    label: "Cards array",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "style",
                        label: "Style",
                        options: ["standard", "logo"],
                        required: true,
                      },
                      {
                        type: "object",
                        name: "cards",
                        label: "Cards",
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item.subTitle }
                          },
                          defaultItem() {
                            return {
                              backgroundColor: '#D6E4F0',
                              borderColor: '#8FB3EC',
                              opacity: 100,
                              copy: {
                                type: 'root',
                                children: [
                                  {
                                    type: 'p',
                                    children: [
                                      {
                                        type: 'text',
                                        text: lorem.generateParagraphs(1),
                                      },
                                    ],
                                  },
                                ],
                              },
                              image: '/cardImgs/startup-593341_640.jpg',
                              subTitle: '[Service]',
                            }
                          },
                        },
                        fields: [
                          {
                            type: "string",
                            name: "subTitle",
                            label: "Subtitle[optional]",
                          },
                          {
                            type: 'string',
                            name: 'backgroundColor',
                            label: 'Background Color',
                            description: 'Edit the card background color here',
                            ui: {
                              component: 'color',
                              colorFormat: 'hex',
                              colors: [
                                '#D6E4F0',
                                '#8FB3EC',
                                '#171738',
                                '#B5C998',
                                "#95BB6A",
                                "#284F49",
                                "#1F3F3A"
                              ],
                              widget: 'block',
                            },
                          },
                          {
                            label: "Background Opacity",
                            name: "opacity",
                            type: "number",
                            description: "determines the opacity of the background",
                            ui: {
                              parse: (val) => Number(val),
                              component: Slider,
                              range: ['0', '100'],
                              steps: '1'
                            }
                          },
                          {
                            type: 'string',
                            name: 'borderColor',
                            label: 'Border Color',
                            description: 'Edit the card border color here',
                            ui: {
                              component: 'color',
                              colorFormat: 'hex',
                              colors: [
                                '#D6E4F0',
                                '#8FB3EC',
                                '#171738',
                                '#B5C998',
                                "#95BB6A",
                                "#284F49",
                                "#1F3F3A"
                              ],
                              widget: 'block',
                            },
                          },
                          {
                            type: "image",
                            name: "image",
                            label: "image",
                          },
                          {
                            type: "image",
                            name: "auxImage",
                            label: "Aux Image",
                          },
                          {
                            type: "rich-text",
                            toolbarOverride: [],
                            name: "copy",
                            label: "Copy",
                            isBody: true,
                          },
                        ]
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "blogPosts",
                    label: "Blog Posts",
                    ui: {
                      itemProps: (item) => {
                        return { label: item.title }
                      },
                      defaultItem() {
                        return {
                          title: 'Blog Post Title',
                          date: new Date().toLocaleDateString("en"),
                          draft: false,
                          includeMedia: false
                        }
                      }
                    },
                    fields: [
                      {
                        type: "number",
                        name: "postDisplayLimit",
                        label: "Post Display Limit",
                        description: "Set the number of posts to display on the page, if applicable",
                      },
                      {
                        name: "posts",
                        label: "Posts",
                        type: "object",
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item.title }
                          },
                          defaultItem() {
                            return {
                              title: 'Blog Post Title',
                              date: new Date().toLocaleDateString("en"),
                              draft: false,
                              includeMedia: false,
                              id: 'Id-' + id
                            }
                          }
                        },
                        fields: [
                          {
                            type: "string",
                            name: "title",
                            label: "Title",
                            isTitle: true,
                            required: true
                          },
                          {
                            type: "object",
                            name: "content",
                            label: "Content",
                            list: true,
                            ui: {
                              itemProps: (item) => {
                                return { label: item.title }
                              }
                            },
                            templates: [
                              {
                                type: "object",
                                name: "simpleCopy",
                                label: "Simple Copy",
                                list: true,
                                // ui: {
                                //   itemProps: (item) => {
                                //     return { label: item.title && item.title.length > 0 ? item.title : 'untitled' }
                                //   }
                                // },
                                fields: [
                                  // {
                                  //   type: "string",
                                  //   name: "title",
                                  //   label: "title[optional]"
                                  // },
                                  {
                                    type: "rich-text",
                                    name: "copy",
                                    label: "Text",
                                    isBody: true,
                                  },
                                ]
                              },
                              {
                                type: "object",
                                name: "splitContent",
                                label: "Split Content",
                                list: true,
                                fields: [
                                  // {
                                  //   type: "string",
                                  //   name: "title",
                                  //   label: "title[optional]"
                                  // },
                                  {
                                    type: "rich-text",
                                    name: "text",
                                    label: "Text",
                                    isBody: true,
                                    required: true
                                  },
                                  {
                                    type: "image",
                                    name: "image",
                                    label: "Image",
                                  },
                                  {
                                    type: "string",
                                    name: "imageWidth",
                                    label: "Image Dimensions[Width]",
                                  },
                                  {
                                    type: "string",
                                    name: "imageHeight",
                                    label: "Image Dimensions[Height]",
                                  },
                                  {
                                    type: "string",
                                    name: "orientation",
                                    label: "Orientation",
                                    options: ["img-txt", "txt-img"],
                                    required: true
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            type: "datetime",
                            name: "date",
                            label: "Date",
                          },
                          {
                            name: 'includeMedia',
                            label: 'Include Media in intial view?',
                            type: 'boolean',
                            description: 'If this is checked the post will have media in the initial view if media is in the first section',
                            ui: {
                              component: 'toggle',
                              toggleLabels: {
                                true: 'yes',
                                false: 'No',
                              }
                            }
                          },
                          {
                            name: 'isDraft',
                            label: 'Draft',
                            type: 'boolean',
                            description: 'If this is checked the post will not be published',
                            ui: {
                              component: 'toggle',
                              toggleLabels: {
                                true: 'yes',
                                false: 'No',
                              }
                            }
                          },
                          {
                            type: 'string',
                            name: 'id',
                            label: 'ID',
                            // ui: {
                            //   component: 'hidden'
                            // }
                          }
                        ]
                      }
                    ]
                  }
                ],
              }
            ],
          },
        ]
      },
      {
        name: "nav",
        label: "Navigation",
        path: "content/nav",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {
            name: "links",
            label: "Links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item.label }
              }
            },
            fields: [
              {
                name: "label",
                label: "Label",
                type: "string",
              },
              {
                name: "url",
                label: "URL",
                type: "reference",
                collections: ["page"],
              },
            ],
          }
        ]
      },
      {
        name: "data",
        label: "Site Data",
        path: "content/data",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {
            label: "Data Title",
            type: "string",
            name: "dataTitle",
            isTitle: true,
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "object",
            fields: [
              {
                name: "label",
                label: "Label",
                type: "string",
              },
              {
                name: "url",
                label: "URL",
                type: "string"
              },
            ]
          },
          {
            name: "phone",
            label: "Phone",
            type: "object",
            fields: [
              {
                name: "label",
                label: "Label",
                type: "string",
              },
              {
                name: "url",
                label: "URL",
                type: "string"
              },
            ]
          },
          {
            name: "address",
            label: "Address",
            type: "object",
            fields: [
              {
                name: "label",
                label: "Label",
                type: "string",
              },
              {
                name: "url",
                label: "URL",
                type: "string"
              },
            ]
          },
          {
            name: "mapLink",
            label: "Map Link",
            type: "string"
          },
          {
            name: "disclaimer",
            label: "disclaimer",
            type: "string"
          },
          {
            name: "socials",
            label: "Socials",
            type: "object",
            list: true,
            fields: [
              {
                name: "label",
                label: "Label",
                type: "string",
              },
              {
                name: "url",
                label: "URL",
                type: "string"
              },
              {
                name: "icon",
                label: "Icon",
                type: "string"
              }
            ]
          }
        ]
      },
      // {
      //   path: "content/blog-posts",
      //   name: "blogPosts",
      //   label: "Blog Posts",
      //   format: "mdx",
      //   ui: {
      //     itemProps: (item) => {
      //       return { label: item.title }
      //     },
      //     defaultItem() {
      //       return {
      //         title: 'Blog Post Title',
      //         date: new Date().toLocaleDateString("en"),
      //         draft: false,
      //         includeMedia: false
      //       }
      //     }
      //   },
      //   fields: [
      //     {
      //       type: "string",
      //       name: "title",
      //       label: "Title",
      //       isTitle: true,
      //       required: true
      //     },
      //     {
      //       type: "datetime",
      //       name: "date",
      //       label: "Date",
      //     },
      //     {
      //       name: 'body',
      //       label: 'Body',
      //       type: 'object',
      //       list: true,
      //       fields: [
      //         {
      //           type: "rich-text",
      //           name: "content",
      //           label: "Content",
      //           isBody: true,
      //           templates: [
      //             {
      //               name: "splitContent",
      //               label: "Split Content",
      //               fields: [
      //                 {
      //                   type: "image",
      //                   name: "image",
      //                   label: "Image",
      //                   required: true
      //                 },
      //                 {
      //                   type: "string",
      //                   name: "imageWidth",
      //                   label: "Image Dimensions[Width]",
      //                 },
      //                 {
      //                   type: "string",
      //                   name: "imageHeight",
      //                   label: "Image Dimensions[Height]",
      //                 },
      //                 {
      //                   type: "rich-text",
      //                   name: "copy",
      //                   label: "Copy",
      //                   isBody: true,
      //                   required: true
      //                 },
      //                 {
      //                   type: "string",
      //                   name: "orientation",
      //                   label: "Orientation",
      //                   options: ["img-txt", "txt-img"],
      //                   required: true
      //                 }
      //               ]
      //             }
      //           ]
      //         },
      //       ]
      //     },
      //     {
      //       name: 'includeMedia',
      //       label: 'Include Media in intial view?',
      //       type: 'boolean',
      //       description: 'If this is checked the post will have media in the initial view if media is in the first section',
      //       ui: {
      //         component: 'toggle',
      //         toggleLabels: {
      //           true: 'yes',
      //           false: 'No',
      //         }
      //       }
      //     },
      //     {
      //       name: 'isDraft',
      //       label: 'Draft',
      //       type: 'boolean',
      //       description: 'If this is checked the post will not be published',
      //       ui: {
      //         component: 'toggle',
      //         toggleLabels: {
      //           true: 'yes',
      //           false: 'No',
      //         }
      //       }
      //     }
      //   ]
      // }
    ],
  },
});
