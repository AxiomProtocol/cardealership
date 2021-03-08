//Importamos todos los modulos u piezas necesarias para el funcionamiento del registro
import React, { Component } from 'react';
import {moment} from 'moment';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';

//Estructura de la coleccion de usuarios para la base de datos
class Register extends Component {
  state = {
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  };

  //Se encarga de manejar los errores posibles en el proceso
  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Favor llenar todos los campos" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Clave invalida" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ firstname, lastname, email, password, passwordConfirmation }) => {
    return (
      !firstname.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  //Valida que la clave mida la cantidad minima establecida
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 8 || passwordConfirmation.length < 8) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.firstname]: event.target.value });
  };

  //Manda la informacion registrada a la base de datos
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      
    };

    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            setTimeout(() => {
              this.props.history.push("/");
            }, 3000);
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "No se pudo almacenar sus datos"
              )
            });
          }
        })
        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      console.log("Invalido");
    }
  };

  //Codigo para renderizar el formulario de registro en la pagina, contiene los campos estipulados en la base de datos
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s6" onSubmit={event => this.submitForm(event)}>
            <h4>Registro de Carromania</h4>
            <div className="row">
              <div className="input-field col s6">
                <input
                  name="firstname"
                  onChange={e => this.handleChange(e)}
                  value={this.state.firstname}
                  id="firstname"
                  type="text"
                  className="validate"
                />
                <label htmlFor="firstname">Nombre</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  name="lastname"
                  onChange={e => this.handleChange(e)}
                  value={this.state.lastname}
                  id="lastname"
                  type="text"
                  className="validate"
                />
                <label htmlFor="lastname">Apellido</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  name="email"
                  onChange={e => this.handleChange(e)}
                  value={this.state.email}
                  id="email"
                  type="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <h4>Clave y Verificacion</h4>

            <div className="row">
              <div className="input-field col s6">
                <input
                  name="password"
                  onChange={e => this.handleChange(e)}
                  value={this.state.password}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label htmlFor="password">Clave</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  name="passwordConfirmation"
                  onChange={e => this.handleChange(e)}
                  value={this.state.passwordConfirmation}
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                />
                <label htmlFor="passwordConfirmation">Confirmar clave</label>
              </div>
            </div>

            {this.state.errors.length > 0 ? (
              <div className="error_label">
                {this.displayErrors(this.state.errors)}
              </div>
            ) : null}

            <div>
              <button
                className="btn waves-effect blue lighten-1"
                type="submit"
                name="action"
                onClick={event => this.submitForm(event)}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);