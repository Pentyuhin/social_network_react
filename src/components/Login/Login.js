import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import classes from "./../common/FormsControls/FormsControls.module.css";



const LoginForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[required]} placeholder={'Email'} name={'email'} component={Input}/>
        </div>
        <div>
            <Field validate={[required]} placeholder={'Password'} name={'password'} type={'password'} component={Input}/>
        </div>
        <div style={{color: 'black', fontSize: '1.5 rem'}}>
            <Field type={'checkbox'} component={'input'} name={'rememberMe'}/>
            <span>Запомнить пароль?</span>
        </div>
          { props.error && <div className={classes.formSummaryError}>
              <span>{props.error}</span>
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
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if(props.isAuth) {
        return <Navigate to={'/'}/>
    }
  return <div>
      <h2 style={{color: 'red', fontSize: '24px'}}>Login</h2>
      <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    login
})(Login);