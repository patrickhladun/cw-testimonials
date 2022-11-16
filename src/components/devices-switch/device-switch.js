import { Button, ButtonGroup, Dashicon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.scss';

const DeviceSwitch = (props) => {
    const { onChange, label } = props;
    const [device, setDevice] = useState(wp.data.select('core/edit-post').__experimentalGetPreviewDeviceType());


    const switchDevice = (updatedDevice) => {
        wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType(updatedDevice);
        setDevice(updatedDevice);
        onChange(updatedDevice);
        activeClass(updatedDevice);
    }

    // add class active to the relevant button based on the device
    const activeClass = (updatedDevice) => {
        // desktop, tablet, mobile

    }

    return (
        <div className='cwt-device-switch'>
            <div className='cwt-device-switch__label'>
                <h3>{ label ? label : 'Device Switch'}</h3>
            </div>
            <ButtonGroup className='cwt-device-switch__buttons'>
                <Button
                    className={`cwt-device-switch__button-desktop${device === 'Desktop' ? ' active' : ''}`}
                    onClick={() => {switchDevice('Desktop') }}
                    isSmall={true}
                >
                    <Dashicon icon="desktop" />
                </Button>
                <Button
                    className={`cwt-device-switch__button-tablet${device === 'Tablet' ? ' active' : ''}`}
                    onClick={() => {switchDevice('Tablet') }}
                    isSmall={true}
                >
                    <Dashicon icon="tablet"/>
                </Button>
                <Button
                    className={`cwt-device-switch__button-mobile${device === 'Mobile' ? ' active' : ''}`}
                    onClick={() => {switchDevice('Mobile') }}
                    isSmall={true}
                >
                    <Dashicon icon="smartphone" />
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default DeviceSwitch;