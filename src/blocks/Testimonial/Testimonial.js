import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/editor';

registerBlockType('cwt-blocks/testimonial', {
    title: __('Testimonial', 'cityweb'),
    description: __('Write your testimonial', 'cityweb'),
    // category: 'cwt-blocks',
    category: 'widgets',
    attributes: {
        body: {
            type: 'string',
            default: '',
        },
    },
    edit: props => {
        const body = props.attributes.body;

        function onBodyChange(body) {
            props.setAttributes({ body: body });
        }

        return (
            <Fragment>
                <div>
                    <RichText
                        key='editable'
                        tagName='p'
                        placeholder='Write testimonial here...'
                        value={body}
                        onChange={onBodyChange}
                        formattingControls={[]}
                    />
                </div>
            </Fragment>
        );
    },
    save: props => {
        return null;
    },
});
