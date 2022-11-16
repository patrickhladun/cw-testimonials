import { useState } from '@wordpress/element';
import { TextControl, SelectControl } from '@wordpress/components';
import './style.scss';

const MeasurementControl = ({label, value, onChange}) => {

    const [itemSize, setItemSize] = useState(value);

    const handleSizeUpdate = (value, item) => {
        value = parseInt(value);
        setItemSize({...itemSize, [item]: value});
        const change = {...itemSize, [item]: value};
        onChange(change);
    }

    const handleUnitUpdate = (unit) => {
        setItemSize({...itemSize, unit});
        const change = {...itemSize, unit};
        onChange(change);
    }

    return (
        <div className='cwb-size-picker'>
            <p>{label}</p>
            <div className='cwb-size-picker__controls'>
                <SelectControl
                    value={itemSize.unit}
                    onChange={(value) => {handleUnitUpdate(value, 'unit')}}
                    options={[
                        {label: 'px', value: 'px'},
                        {label: 'em', value: 'em'},
                        {label: 'rem', value: 'rem'},
                        {label: '%', value: '%'},
                    ]}
                />
                <div className='measurement-container'>
                    <div className='measurement-container-item'>
                        <TextControl
                            type='number'
                            value={itemSize.top}
                            onChange={(value) => {handleSizeUpdate(value, 'top')}}
                        />
                        <span>Top</span>
                    </div>
                    <div className='measurement-container-item'>
                        <TextControl
                            type='number'
                            value={itemSize.right}
                            onChange={(value) => {handleSizeUpdate(value, 'right')}}
                        />
                        <span>Right</span>
                    </div>
                    <div className='measurement-container-item'>
                        <TextControl
                            type='number'
                            value={itemSize.bottom}
                            onChange={(value) => {handleSizeUpdate(value, 'bottom')}}
                        />
                        <span>Bottom</span>
                    </div>
                    <div className='measurement-container-item'>
                        <TextControl
                            type='number'
                            value={itemSize.left}
                            onChange={(value) => {handleSizeUpdate(value, 'left')}}
                        />
                        <span>Left</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MeasurementControl;
