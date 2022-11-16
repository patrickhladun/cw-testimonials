import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';

registerBlockType('cwt-blocks/testimonials', {
    title: __('Testimonials', 'cityweb'),
    description: __('Display Testimonial Carousel', 'cityweb'),
    // category: 'cwt-blocks',
    category: 'widgets',
    icon: 'category',
    keywords: [__('media', 'cityweb')],
    attributes: {
        additionalText: {
          type: 'string'
        },
        additionalTextPrefix: {
            type: 'string'
        },
        blockID: {
            type: 'string'
        },
        style: {
            type: 'string'
        },
        design: {
            type: 'string'
        },
        categories: {
            type: 'array'
        },
        categoryPrefix: {
            type: 'string'
        },
        backgroundColor: {
            type: 'string',
            default: '#f9f9f9'
        },
        accentColor: {
            type: 'string'
        },
        navTextColor: {
            type: 'string'
        },
        contentTextColor: {
            type: 'string',
            default: '#707070'
        },
        contentFontSize: {
            type: 'object',
            default: {
                desktop: 17,
                tablet: 16,
                mobile: 15,
                unit: 'px'
            }
        },
        testimonialPadding: {
            type: 'object',
            default: {
                mobile: {
                    top: 16,
                    right: 16,
                    bottom: 16,
                    left: 16,
                    unit: 'px'
                },
                tablet: {
                    top: 16,
                    right: 16,
                    bottom: 16,
                    left: 16,
                    unit: 'px'
                },
                desktop: {
                    top: 16,
                    right: 16,
                    bottom: 11,
                    left: 16,
                    unit: 'px'
                },
            }
        },
        nameTextColor: {
            type: 'string',
            default: '#707070'
        },
        nameFontSize: {
            type: 'object',
            default: {
                desktop: 22,
                tablet: 18,
                mobile: 16,
                unit: 'px'
            }
        },
        titleTextColor: {
            type: 'string',
            default: '#707070'
        },
        titleFontSize: {
            type: 'object',
            default: {
                desktop: 22,
                tablet: 18,
                mobile: 16,
                unit: 'px'
            }
        },
        hasImage: {
            type: 'boolean',
            default: true
        },
        hasName: {
            type: 'boolean',
            default: true
        },
        hasTitle: {
            type: 'boolean',
            default: true
        },
        hasCompany: {
            type: 'boolean',
            default: false
        },
        hasEmail: {
            type: 'boolean',
            default: false
        },
        hasWebsite: {
            type: 'boolean',
            default: false
        },
        hasCategoryPrefix: {
            type: 'boolean',
            default: false
        },
    },
    edit,
    save: props => {
        return null;
    },
});
