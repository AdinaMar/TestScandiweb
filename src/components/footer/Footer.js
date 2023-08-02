import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={{ textAlign: 'center' }}>
        <hr style={{ borderTop: '1px solid black' }} />
        <p className="footerText">Scandiweb Test Assignment</p>
      </footer>
    );
  }
}

export default Footer;