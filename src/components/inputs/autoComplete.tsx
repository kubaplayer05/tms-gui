import {Autocomplete, TextField} from "@mui/material";

interface InputProps {
    label?: string,
    values?: [],
}

export default function AutoCompleteInput({label, values = []}: InputProps) {

    return (
        <Autocomplete freeSolo
                      renderInput={(params) => <TextField {...params} label={label}/>}
                      options={values?.map(option => option)}/>
    )
}
