//creamos los parametros para la pagina de login
//Esta siendo utilizado MaterializeCSS como la libreria de CSS para las paginas en frontend.
import React, {Component} from 'react';

class RegisterLogin extends Component{
    render(){
       return(
        <div className="container">
            <h2>Iniciar Sesion</h2>
            <div className="row">
                <form className="col s6" onSubmit={event => this.submitForm(EventSource)}>
                    <div className="row">
                        <div className="input-field col s6">

                        <input
                        name="email"
                        value={this.state.email}
                        onChange={e => this.handleChange(e)}
                        id="email"
                        type="email"
                        className="validate"
                    />
                    <label htmlForm="email">Email</label>
                    <span
                        className="helper-text"
                        data-error="Escriba bien el email."
                        data-success="Bien"
                        />

                        </div>
                    

                    </div>

                        <div className="row">
                            <div className="input-field col s6">

                            <input
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                        id="password"
                        type="password"
                        className="validate"
                    />
                    <label htmlForm="email">Clave</label>
                    <span
                        className="helper-text"
                        data-error="Mal"
                        data-success="Bien"
                        />


                            </div>

                    </div>

                    <div className="row">
                        <div className="col s6">
                            <button className="btn waves-effect blue lighten-1"
                            type="submit"
                            name="action"
                            onClick={this.submitForm}>

                                Iniciar Sesion
                            </button>


                        </div>



                    </div>

                </form>
            </div>
            
        </div>
       )
    }
}

export default RegisterLogin;