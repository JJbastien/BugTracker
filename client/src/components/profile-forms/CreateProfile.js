import React, {useState, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({createProfile, history}) => {
    const [formData, setFormData] = useState({
        department: '',
        title: ''

    })
    const {department, title} = formData;

    const onSubmit = e =>{
       e.preventDefault();
       createProfile(formData, history)
    }


     const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})
    return (
        <Fragment>
           <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information 
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit ={ e => onSubmit(e)} >
        <div class="form-group">
          <input type="text" placeholder="department" name="department" value={department} onChange={e => onChange(e)}/>
          <small class="form-text"
            >department affiliation</small
          >
        </div>
        <div class="form-group">
          <input type="text" placeholder="title" name="title" value={title} onChange={e => onChange(e)}/>
          <small class="form-text"
            >could be your job description</small
          >
        </div>
        
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,

}

export default connect(null, {createProfile})(withRouter(CreateProfile))
