import React from 'react';

import { connect } from 'react-redux';

function UserPage({ logout }) {
  return (
    <>
      <div>User Page</div>
      <button onClick={logout}>退出登录</button>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch({ type: 'LOGOUT' })
  };
}

export default connect(
  state => state,
  mapDispatchToProps
)(UserPage);
