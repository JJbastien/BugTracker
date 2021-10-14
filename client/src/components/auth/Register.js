import React, { Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import {register} from '../../actions/auth';





const Register = ({setAlert, register, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
        const {name, email, password, password2} = formData;
        const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
        const onSubmit = e =>{
            e.preventDefault();
            if (password2 !==password){
                setAlert('passwords do no match', 'danger')
            }
            else{
                register({name, email, password})
            }
        }

        if(isAuthenticated){
          return <Redirect to="/dashboard" />
        }

    return (
        <Fragment>
        <h1 class="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name"  value={name}  onChange={ e=> onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={ e=> onChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={ e=> onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            name="password2"
            onChange={ e=> onChange(e)}
            
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </Fragment>
       
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}

export default connect(mapStateToProps, {setAlert,register})(Register)