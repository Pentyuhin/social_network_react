import React, {ReactNode} from 'react'
import classes from "./FormsControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps, WrappedFieldsProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error

    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
                <div>{children}</div>
                { hasError && <span>{error}</span>}
        </div>
    )
}



export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/> </FormControl>
}

export const Input: React.FC<WrappedFieldProps>  = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/> </FormControl>
}

export function createField<FormsKeyType extends string>(validate: Array<FieldValidatorType>,
                            placeholder: string | undefined,
                            name: FormsKeyType,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = '') {

    return <div>
        <Field validate={validate}
               placeholder={undefined}
               name={name}
               component={component}
               {...props}/> {text}
    </div>

}

