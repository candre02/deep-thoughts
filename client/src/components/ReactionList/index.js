// import files
import React from 'react';
import { Link } from 'react-router-dom';

// reactionList comp, giving the reactions array as a prop
const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
    <div className="card-header">
      <span className="text-light">Reactions</span>
    </div>
    <div className="card-body">
        {/* reactions arr, mapped into a list of <p> elements */}
      {reactions &&
        reactions.map(reaction => (
          <p className="pill mb-3" key={reaction._id}>
            {reaction.reactionBody} //{' '}
            {/* each recation includes the author's name, route to the profile page */}
            <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 700 }}>
              {reaction.username} on {reaction.createdAt}
            </Link>
          </p>
        ))}
    </div>
  </div>

  );
};

export default ReactionList;