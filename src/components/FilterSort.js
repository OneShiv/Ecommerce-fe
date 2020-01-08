import React from 'react';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const FilterSort = (props) => {
    const { setOrderCb, setRangeCb, order, range } = props;

    const handleSlideChange = (event, newValue) => {
        setRangeCb(newValue);
    };
    const handleChange = event => {
        setOrderCb(event.target.value);
    };
    return (
        <div style={{
            background: 'white',
            padding: '16px'
        }}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Order By</FormLabel>
                <RadioGroup aria-label="order" name="order" value={order} onChange={handleChange}>
                    <FormControlLabel value="asc" control={<Radio />} label="Asc" />
                    <FormControlLabel value="desc" control={<Radio />} label="Desc" />
                </RadioGroup>
            </FormControl>
            <div style={{
                maxWidth: '300px'
            }}>
                <Slider
                    value={range}
                    onChange={handleSlideChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
        </div>
    )
}

export default FilterSort;