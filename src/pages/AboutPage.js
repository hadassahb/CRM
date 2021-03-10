import * as React from "react";

const styles = {
  about: {
    paddingTop: "3em",
    display: "grid",
    justifyContent: "center",
  },
  title: {
    paddingTop: "50px",
    paddingBottom: "30px",
    textAlign: "center",
    fontSize: "36px"
  },
  version: {
    display: "flex",
    justifyContent: "center",
    fontSize: "24px",
    color: "darkcyan",
  },
  desc: {
    padding: "0px 50px",
    fontSize: "20px"
  }
}


const AboutPage = () => {
    return (
      <React.Fragment>
        <div style={styles.about}>
          <div style={styles.title}><b>About</b></div>
          <div style={styles.version}>React CRM App</div>
          <div style={styles.desc}>
            <p>This app is a Custumer- Management application that has a Backend service and to update any data of the company including orders, custemers, memberships etc. 
              Enjoy!!
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }


export default AboutPage;