import {__} from '@wordpress/i18n';
import {Fragment, useState} from '@wordpress/element';

import MeasurementControl from "../measurement-control/measurement-control";

import './style.scss';
import DeviceSwitch from "../devices-switch/device-switch";

const BoxControl = ({ value, onChange }) => {

    const [ device, setDevice ] = useState(wp.data.select('core/edit-post').__experimentalGetPreviewDeviceType());
    const [ itemSize, setItemSize ] = useState(value);

    const handleUpdate = (value, device) => {
        setItemSize({...itemSize, [device]: value});
        const change = {...itemSize, [device]: value};
        onChange(change);
    }

    const handleDeviceChange = (device) => {
        setDevice(device)
    }

    return (
        <div>
            <div className='cwb-box-control'>
                <DeviceSwitch
                    label='Padding'
                    device={device}
                    onChange={handleDeviceChange}
                />
                <div className='cwb-box-control__body'>

                    { device === 'Desktop' &&
                        <MeasurementControl
                            value={itemSize.desktop}
                            onChange={(value) => { handleUpdate(value, 'desktop') }}
                        />
                    }

                    { device === 'Tablet' &&
                        <MeasurementControl
                            value={itemSize.tablet}
                            onChange={(value) => { handleUpdate(value, 'tablet') }}
                        />
                    }

                    { device === 'Mobile' &&
                        <MeasurementControl
                            value={itemSize.mobile}
                            onChange={(value) => { handleUpdate(value, 'mobile') }}
                        />
                    }

                </div>
            </div>
        </div>
    );
}

export default BoxControl;