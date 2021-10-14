import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';

const Login = ({loginUser, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
       
    });
        const { email, password } = formData;
        const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
        const onSubmit = e =>{
            e.preventDefault();
           loginUser(email, password)
            }

            // Redirection after login
            if(isAuthenticated){
             return <Redirect to="/dashboard" />
            }
        
        
    return (
        <Fragment>
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={ e=> onChange(e)} />
          <small className="form-text"> </small>
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
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
            Don't have an account? <Link to= "/Register" >Sign Up</Link>
      </p>
      </Fragment>
       
    )
    
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

 Login.propTypes = {
   loginUser: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

 }
export default connect(mapStateToProps, {loginUser})(Login)
