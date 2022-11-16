import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/editor';
import { Fragment, useEffect, useState} from '@wordpress/element';
import {
    ColorPalette,
    PanelBody,
    ToggleControl,
    TextControl,
    SelectControl,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import BoxControl from '../../components/box-control/box-control';
import FontSizeControl from '../../components/font-size-control/font-size-control';
import ShortUniqueId from 'short-unique-id';

import TokenMultiSelectControl from "../../components/token-multiselect-control";

import './editor.scss';

const Edit = (props) => {

    const [device, setDevice] = useState(wp.data.select('core/edit-post').__experimentalGetPreviewDeviceType());

    const {
        categories,
        categoryPrefix,
        style,
        design,
        backgroundColor,
        accentColor,
        testimonialPadding,
        contentTextColor,
        contentFontSize,
        nameTextColor,
        nameFontSize,
        titleTextColor,
        titleFontSize,
        navTextColor,
        hasCategoryPrefix,
        hasName,
        hasTitle,
        hasCompany,
        hasEmail,
        hasWebsite,
        hasImage,
    } = props.attributes;
    console.log('Testimonial Padding: ', testimonialPadding);
    // Editor Styles
    const testimonialStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '16px',
        color: contentTextColor,
        backgroundColor: backgroundColor,
    }

    const getCategories = () => {
        const { categories } = props;
        let cats = [];
        if (categories !== null) {
            cats = categories.map(cat => {
                if (cat !== undefined) {
                    return { label: cat.name, value: cat.slug };
                }
            });
        }
        cats.unshift({ label: __('Select category', 'cityweb'), value: '' });
        return cats;
    }
    const getCategoriesList = () => {
        const { categories } = props;
        let cats = [];
        if (categories !== null) {
            cats = categories.map(cat => {
                if (cat !== undefined) {
                    return { value: cat.slug, label: cat.name };
                }
            });
        }
        return cats;
    }
    const setBlockID = (blockID) => {
        if(blockID === undefined) {
            const uid = new ShortUniqueId({ length: 6 });
            props.setAttributes({blockID: uid()});
        }
    }

    useEffect(() => {
        // setBlockID();
    }, []);

    const handleDeviceChange = (device) => {
        setDevice(device)
    }

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Settings', 'cityweb')}>
                    <SelectControl
                        label={__('Style', 'cityweb')}
                        value={style}
                        onChange={style => {props.setAttributes({ style })}}
                        options={[
                            { label: 'Carousel', value: 'carousel' },
                            { label: 'List', value: 'list' },
                            { label: 'Single', value: 'single', disabled: true },
                        ]}
                    />

                    <SelectControl
                        label={__('Design', 'cityweb')}
                        value={design}
                        onChange={design => {props.setAttributes({ design })}}
                        options={[
                            {label: 'Default', value: 'default'},
                            {label: 'Simple', value: 'simple'},
                            {label: 'Border', value: 'border'}
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Testimonial', 'cityweb')} initialOpen={true}>
                    <FontSizeControl
                        value={contentFontSize}
                        min={10}
                        max={30}
                        units={[
                            {label: 'px', value: 'px'},
                            {label: 'em', value: 'em'},
                            {label: 'rem', value: 'rem'},
                            {label: '%', value: '%'},
                        ]}
                        onChange={contentFontSize => {
                            props.setAttributes({contentFontSize});
                        }}
                    />
                    <BoxControl
                        value={testimonialPadding}
                        onChange={testimonialPadding => {
                            console.log(testimonialPadding);
                            props.setAttributes({testimonialPadding})
                        }}
                    />
                </PanelBody>
                <PanelBody title={__('Name', 'cityweb')} initialOpen={true}>
                    <h4>Author Name Font Size</h4>
                    <ToggleControl
                        label="Name"
                        value={hasName}
                        help={hasName ? 'Showing the name.' : 'Toggle to show the name.'}
                        checked={hasName}
                        onChange={hasName => {
                            props.setAttributes({hasName})
                        }}
                    />
                    <FontSizeControl
                        value={nameFontSize}
                        min={10}
                        max={30}
                        units={[
                            {label: 'px', value: 'px'},
                            {label: 'em', value: 'em'},
                            {label: 'rem', value: 'rem'},
                            {label: '%', value: '%'},
                        ]}
                        onChange={nameFontSize => {
                            props.setAttributes({nameFontSize});
                        }}
                    />
                </PanelBody>
                <PanelBody title={__('Title', 'cityweb')} initialOpen={false}>
                    <h4>Author Job Title Font Size</h4>
                    <ToggleControl
                        label="Title"
                        value={hasTitle}
                        help={ hasTitle ? 'Showing the title.' : 'Toggle to show the title.' }
                        checked={ hasTitle }
                        onChange={ hasTitle => {props.setAttributes({hasTitle})} }
                    />
                    <FontSizeControl
                        name='Title Font Size'
                        value={titleFontSize}
                        min={10}
                        max={30}
                        units={[
                            {label: 'px', value: 'px'},
                            {label: 'em', value: 'em'},
                            {label: 'rem', value: 'rem'},
                            {label: '%', value: '%'},
                        ]}
                        onChange={titleFontSize => {
                            props.setAttributes({titleFontSize});
                        }}
                    />
                </PanelBody>
                <PanelBody title={__('Company', 'cityweb')} initialOpen={ false }>

                    <h4>Company</h4>
                    <ToggleControl
                        label="Company"
                        value={hasCompany}
                        help={ hasCompany ? 'Showing the company.' : 'Toggle to show the company.' }
                        checked={ hasCompany }
                        onChange={ hasCompany => {props.setAttributes({hasCompany})} }
                    />

                </PanelBody>
                <PanelBody title={__('Email', 'cityweb')} initialOpen={false}>
                    <h4>Author Email</h4>
                    <ToggleControl
                        label="Email"
                        value={hasEmail}
                        help={ hasEmail ? 'Showing the email.' : 'Toggle to show the email.' }
                        checked={ hasEmail }
                        onChange={hasEmail => {props.setAttributes({hasEmail})}}
                    />
                </PanelBody>
                <PanelBody title={__('Website', 'cityweb')} initialOpen={false}>
                    <h4>Author Website</h4>
                    <ToggleControl
                        label="Website"
                        value={hasWebsite}
                        help={ hasWebsite ? 'Showing the website.' : 'Toggle to show the website.' }
                        checked={ hasWebsite }
                        onChange={ hasWebsite => {props.setAttributes({hasWebsite})} }
                    />
                </PanelBody>
                <PanelBody title={__('Image', 'cityweb')} initialOpen={false}>
                    <h4>Author Image</h4>
                    <ToggleControl
                        label="Author Image"
                        value={hasImage}
                        help={ hasImage ? 'Showing Author Image.' : 'Toggle to show Author Image.' }
                        checked={ hasImage }
                        onChange={hasImage => {props.setAttributes({hasImage})}}
                    />
                </PanelBody>
                <PanelBody title={__('Categories', 'cityweb')} initialOpen={ false }>
                    <TokenMultiSelectControl
                        label={__('Categories', 'cityweb')}
                        value={categories}
                        options={ getCategoriesList() }
                        onChange={ categories => {props.setAttributes({ categories });} }
                    />
                    <ToggleControl
                        label="Category Prefix"
                        value={hasCategoryPrefix}
                        help={ hasCategoryPrefix ? 'Showing the Category Prefix.' : 'Toggle to show the Category Prefix.' }
                        checked={ hasCategoryPrefix }
                        onChange={ hasCategoryPrefix => {props.setAttributes({hasCategoryPrefix})} }
                    />
                    { hasCategoryPrefix &&
                        <Fragment>
                            <TextControl
                                label={__('Category Prefix', 'cityweb')}
                                value={categoryPrefix}
                                onChange={categoryPrefix => {props.setAttributes({categoryPrefix})}}
                            />
                        </Fragment>
                    }
                </PanelBody>
                <PanelBody title={__('Design', 'cityweb')} initialOpen={ false }>
                    <p>{__('Background Color', 'cityweb')}</p>
                    <ColorPalette
                        value={backgroundColor}
                        onChange={backgroundColor => {props.setAttributes({ backgroundColor });}}
                        colors={wp.data.select("core/editor").getEditorSettings().colors}
                    />

                    <p>{__('Accent Color', 'cityweb')}</p>
                    <ColorPalette
                        value={accentColor}
                        onChange={accentColor => {props.setAttributes({ accentColor })}}
                        colors={wp.data.select("core/editor").getEditorSettings().colors}
                    />

                    <p>{__('Testimonial Color', 'cityweb')}</p>
                    <ColorPalette
                        value={contentTextColor}
                        onChange={contentTextColor => {props.setAttributes({ contentTextColor })}}
                        colors={wp.data.select("core/editor").getEditorSettings().colors}
                    />

                    <p>{__('Name Color', 'cityweb')}</p>
                    <ColorPalette
                        value={nameTextColor}
                        onChange={nameTextColor => {props.setAttributes({ nameTextColor })}}
                        colors={wp.data.select("core/editor").getEditorSettings().colors}
                    />

                    <p>{__('Title Color', 'cityweb')}</p>
                    <ColorPalette
                        value={titleTextColor}
                        onChange={titleTextColor => {props.setAttributes({ titleTextColor })}}
                        colors={wp.data.select("core/editor").getEditorSettings().colors}
                    />

                    <p>{__('Navigation Text Color', 'cityweb')}</p>
                    <ColorPalette
                        value={navTextColor}
                        onChange={navTextColor => {props.setAttributes({ navTextColor });}}
                        colors={wp.data.select("core/editor").getEditorSettings().colors}
                    />
                </PanelBody>
            </InspectorControls>

            <div style={testimonialStyle}>
                <h2>Display Testimonials</h2>
                <p>Block presentation will be available in the future releases.</p>
            </div>
        </Fragment>
    );
}

export default withSelect((select, props) => {
    return {
        categories: select('core').getEntityRecords(
            'taxonomy',
            'cwt_testimonial_category'
        ),
    };
})(Edit);