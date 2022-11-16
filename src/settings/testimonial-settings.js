import { registerPlugin } from '@wordpress/plugins';
import Settings from './settings';

registerPlugin('cwt-testimonial-options', {
    render: () => <Settings />,
    icon: '',
});
