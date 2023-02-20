import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import classes from "./../common/FormsControls/FormsControls.module.css";



const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
      <form onSubmit={handleSubmit}>
          {createField([required], 'Email', 'email', Input)}
          {createField([required], 'Password', 'password', Input, {type: 'password'})}
          <div style={{color: 'black', fontSize: '1.5 rem'}}>
            {createField([], null, 'rememberMe', Input, {type: 'checkbox'}, "remember me")}
          </div>

          {
              captchaUrl && <div><img src={captchaUrl}/></div>
          }
          {
              captchaUrl && createField([required], 'Symbols from image', 'captcha', Input, {})}
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

const LoginReduxForm = reduxForm({

    form: 'login'

})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe , formData.captcha);
    }

    if(props.isAuth) {
        return <Navigate to={'/'}/>
    }
  return <div>
      <h2 style={{color: 'red', fontSize: '24px'}}>Login</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
  </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {
    login
})(Login);