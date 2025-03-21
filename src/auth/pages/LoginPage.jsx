
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks/';
import Swal from 'sweetalert2';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {

    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
}

  export const LoginPage = () => {

    const { initlogin, errorMessage, newRegister } = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        initlogin({email: loginEmail, password: loginPassword});
    }

    const {registerName, registerEmail, registerPassword, registerConfirmPassword, onInputChange:onRegisterInputChange} = useForm(registerFormFields);

    const registerSubmit = (event) => {
        event.preventDefault();
        if ( registerPassword !== registerConfirmPassword ) {
            Swal.fire('Register Error', 'The passwords do not match.', 'error');
            return;
        }
        newRegister({name: registerName, email: registerEmail, password: registerPassword});
    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Authentication Error', errorMessage, 'error');
      }
    }, [errorMessage])


      return (
          <div className="container login-container">
              <div className="row">
                  <div className="col-md-6 login-form-1">
                      <h3>Login</h3>
                      <form onSubmit={ loginSubmit }>
                          <div className="form-group mb-2">
                              <input 
                                  type="text"
                                  className="form-control"
                                  placeholder="Email"
                                  name='loginEmail'
                                  value={ loginEmail }
                                  onChange={ onLoginInputChange }
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name='loginPassword'
                                  value={ loginPassword }
                                  onChange={ onLoginInputChange }
                              />
                          </div>
                          <div className="d-flex justify-content-center">
                              <input 
                                  type="submit"
                                  className="btnSubmit"
                                  value="Login" 
                              />
                          </div>
                      </form>
                  </div>
  
                  <div className="col-md-6 login-form-2">
                      <h3>Register</h3>
                      <form onSubmit={registerSubmit}>
                          <div className="form-group mb-2">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  name='registerName'
                                  value={ registerName }
                                  onChange={ onRegisterInputChange }
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email"
                                  name='registerEmail'
                                  value={ registerEmail }
                                  onChange={ onRegisterInputChange }
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password" 
                                  name='registerPassword'
                                  value={ registerPassword }
                                  onChange={ onRegisterInputChange }
                              />
                          </div>
  
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Confirm Password"
                                  name='registerConfirmPassword'
                                  value={ registerConfirmPassword }
                                  onChange={ onRegisterInputChange } 
                              />
                          </div>
  
                          <div className="d-flex justify-content-center">
                              <input 
                                  type="submit" 
                                  className="btnSubmit" 
                                  value="Create Account" />
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )
  }
