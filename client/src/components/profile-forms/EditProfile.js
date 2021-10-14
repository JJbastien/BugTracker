import React, {useState, Fragment, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({profile:{profile, loading},
     createProfile, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        department: '',
        title: ''

    })

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            department: loading || !profile.department ? '' : profile.department,
            title: loading || !profile.title ? '' : profile.title
         })}, [loading]);
    const {department, title} = formData;

    

    const onSubmit = e =>{
       e.preventDefault();
       createProfile(formData, history, true)
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
        <div className="form-group">
          <input type="text" placeholder="department" name="department" value={department} onChange={e => onChange(e)}/>
          <small className="form-text"
            >department affiliation</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="title" name="title" value={title} onChange={e => onChange(e)}/>
          <small className="form-text"
            >could be your job description</small
          >
        </div>
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-dark my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))
