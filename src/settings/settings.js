import {__} from '@wordpress/i18n';import {Fragment} from '@wordpress/element';import {useSelect} from '@wordpress/data';import {PanelRow, TextControl, withNotices} from '@wordpress/components';import {PluginDocumentSettingPanel} from '@wordpress/edit-post';import {useEntityProp} from '@wordpress/core-data';const Settings = (props) => {    const postType = useSelect(select => {        return select('core/editor').getCurrentPostType();    });    if (postType !== 'cwt_testimonial') {        return null;    }    const {noticeUI} = props;    const [meta, setMeta] = useEntityProp('postType', postType, 'meta');    const {        _display_name,        _title,        _company,        _email,        _website,    } = meta;    const onDisplayNameUpdate = displayName => {        setMeta({...meta, _display_name: displayName});    };    const onTitleUpdate = title => {        setMeta({...meta, _title: title});    };    const onCompanyUpdate = company => {        setMeta({...meta, _company: company});    };    const onEmailUpdate = email => {        setMeta({...meta, _email: email});    };    const onWebsiteUpdate = website => {        setMeta({...meta, _website: website});    };    return (        //todo: set plugin panel to be on top        <Fragment>            <PluginDocumentSettingPanel name="testimonial-details" title={__('Details', 'cityweb')}>                <PanelRow>                    <TextControl                        label={__('Display Name', 'cityweb')}                        value={_display_name}                        onChange={onDisplayNameUpdate}                    />                </PanelRow>                <PanelRow>                    <TextControl                        label={__('Title', 'cityweb')}                        value={_title}                        onChange={onTitleUpdate}                    />                </PanelRow>                <PanelRow>                    <TextControl                        label={__('Company', 'cityweb')}                        value={_company}                        onChange={onCompanyUpdate}                    />                </PanelRow>                <PanelRow>                    <TextControl                        label={__('Email', 'cityweb')}                        value={_email}                        onChange={onEmailUpdate}                    />                </PanelRow>                <PanelRow>                    <TextControl                        label={__('Website', 'cityweb')}                        value={_website}                        onChange={onWebsiteUpdate}                    />                </PanelRow>            </PluginDocumentSettingPanel>        </Fragment>    );}export default withNotices(Settings);