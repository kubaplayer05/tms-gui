import {Autocomplete, TextField} from "@mui/material";
import {ChangeEvent} from "react";

interface InputProps {
    label?: string,
    values?: [],
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function AutoCompleteInput({label, values = [], value, onChange}: InputProps) {

    return (
        <Autocomplete freeSolo
                      renderInput={(params) => <TextField {...params} label={label} value={value} onChange={onChange}/>}
                      options={values?.map(option => option)}/>
    )
}
