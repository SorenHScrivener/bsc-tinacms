import React from 'react'
import { wrapFieldsWithMeta } from 'tinacms'

export const Slider = wrapFieldsWithMeta(( {  field, input, meta }) => {
    const label = field.label;
    return (
        <div>
            <input
                id={label.replaceAll(' ', '-').toLowerCase()}
                type="range"
                min={`${field.range[0]}`}
                max={`${field.range[1]}`}
                step={`${field.steps}`}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
            />
            <br />
            Value: {input.value}
        </div>
    )
})
