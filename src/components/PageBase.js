import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";

const grey600 = grey["600"];


const styles={
  navigation: {
    fontSize: 15,
    fontWeight: 400, 
    color: grey600,
    paddingBottom: 15,
    display: "block",
  },
  title: {
    fontSize: 24,
    fontWeight: 500, 
    marginBottom: 20,
  },
  paper: {
    padding: 10,
  },
  main:{
    paddingTop: 80,
    paddingLeft: 30,
    paddingRight: 30
  },
  clear: {
    clear: "both"
  }
}

export default function PageBase({ title, navigation, children }){
  return (
    <div style={styles.main}>
      <span style={styles.navigation}>{navigation}</span>

      <Paper style={styles.paper}>
        <h3 style={styles.title}>{title}</h3>

        <Divider />
        {children}

        <div style={styles.clear} />
      </Paper>
    </div>
  );
};