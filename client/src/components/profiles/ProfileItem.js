import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({profile: {
    user: {_id, name},
    department,
    title
}}) => {
    return (
        <div className="profile bg-light">
             <div>
                <h2>name:{name}</h2>
                <p>department:{department}</p>
                <p>title:{title}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div> 
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,

}

export default ProfileItem
