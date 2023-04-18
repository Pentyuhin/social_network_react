import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import classes from "./../common/FormsControls/FormsControls.module.css";
import {AppStateType} from "../../redux/redux-store";
import { ThunkDispatch } from "redux-thunk";


type LoginFormOwnProps = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
  return (
      <form onSubmit={handleSubmit}>
          {createField<LoginFormValuesTypeKeys>([required], 'Email', 'email', Input)}
          {createField<LoginFormValuesTypeKeys>([required], 'Password', 'password', Input, {type: 'password'})}
          <div style={{color: 'black', fontSize: '1.5 rem'}}>
            {createField<LoginFormValuesTypeKeys>([], undefined, 'rememberMe', Input, {type: 'checkbox'}, "remember me")}
          </div>

          {
              captchaUrl && <div><img src={captchaUrl}/></div>
          }
          {
              captchaUrl && createField([required], 'Symbols from image', 'captcha', Input, {})
          }

          { error && <div className={classes.formSummaryError}>
              <span>{ error }</span>
          </div> }
        <div>
            <button>Login</button>
        </div>
      </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | undefined
}
export type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>


export const Login: React.FC = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch<any>(login(formData.email, formData.password, formData.rememberMe , formData.captcha));
    }

    if(isAuth) {
        return <Navigate to={'/'}/>
    }
  return <div>
      <h2 style={{color: 'red', fontSize: '24px'}}>Login</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
  </div>
}
