import React from 'react'
import { wrapFieldsWithMeta } from 'tinacms'

interface RangeField {
    label: string;
    range: [number, number];
    steps: number;
}

export const Slider = wrapFieldsWithMeta(({ field, input, meta }: { field: RangeField, input: any, meta: any }) => {
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
