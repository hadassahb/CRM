import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";
import themeDefault from "../theme-default";
import { connect } from "react-redux";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { WithWidth } from "@material-ui/core/withWidth";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import "../styles.css";

import LoginPage from "./SignInPage";
import styles from "../styles";
import AppNavBar from "../components/AppNavBar";
import AppNavDrawer from "../components/AppNavDrawer";
import { thunkAuth } from "../services/thunks";
import { SIGN_IN, HttpMethod, SIGN_OUT } from "../store/types";
import CustomerListPage from "./CustomerListPage";
import CustomerFormPage from "./CustomerFormPage";
import OrderFormPage from "./OrderFormPage";
import OrderListPage from "./OrderListPage";
import ProductFormPage from "./ProductFormPage";
import ProductListPage from "./ProductListPage";
import AboutPage from "./AboutPage";
import ChangePasswordPage from "./ChangePasswordPage";
import hookie from "../components/UseStyles";


const isSmallsWindowScreen = () => {
    return window.innerWidth <= 600;
};

const use_styles = hookie;
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
        navDrawerOpen: !isSmallsWindowScreen(),
        isSmallScreen: isSmallsWindowScreen(),
        showDashboard: false,
      };
      this.signOut = this.signOut.bind(this);
      this.changePass = this.changePass.bind(this);
    }

    signInAction = {
        type: SIGN_IN,
        endpoint: "login/",
        method: HttpMethod.POST,
        data: {},
    };
    signOutAction = {
        type: SIGN_OUT,
        endpoint: "logout/",
        method: HttpMethod.GET,
        data: {},
    };
    
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        const pathname = this.props.location.pathname;
        const showDashboard = pathname === "/" || pathname.endsWith("dashboard");
        this.setState({ showDashboard });
        this.props.isAuthenticated && this.props.location.pathname === "/" && this.props.history.push("/dashboard");
    }

    componentDidUpdate(prevProps) {
    if (
        this.props.isAuthenticated !== prevProps.isAuthenticated &&
        this.props.isAuthenticated === true
    ) {
        this.props.isAuthenticated && this.props.location.pathname === "/" && this.props.history.push("/dashboard");
    }
    }

    resize = () => {
        this.setState({
          isSmallScreen: isSmallsWindowScreen(),
          navDrawerOpen: !isSmallsWindowScreen(),
        });
      }
      
    handleDrawerToggle = () => {
        this.setState({
          navDrawerOpen: !this.state.navDrawerOpen,
        });
    }

    signIn = (c) => {
        this.signInAction.data = c;
        this.props.signInUser(this.signInAction);
      }
    
    signOut = () => {
        this.props.signOutUser(this.signOutAction);
    }
    
    changePass = () => {
        this.props.history.push("/changepass");
    }

    render() {
        const { isAuthenticated, user } = this.props;
        const firstname = user && user.firstname ? user.firstname : "";
        const lastname = user && user.lastname ? user.lastname : "";
        const navDrawerOpen = this.state.navDrawerOpen;
        const isSmallScreen = this.state.isSmallScreen;
        const appStlyes = use_styles(navDrawerOpen, isSmallScreen);
        const pathname = this.props.location.pathname;
        const showDashboard = pathname === "/" || pathname.endsWith("dashboard");
        return(
            <MuiThemeProvider theme={themeDefault}>
                <div>
                    {isAuthenticated && (
                        <div>
                            <AppNavBar
                             styles = {appStlyes}
                             handleDrawerToggle = {this.handleDrawerToggle.bind(this)}
                            ></AppNavBar>
                            <AppNavDrawer
                             drawerStyle = {appStlyes.drawer}
                             navDrawerOpen={navDrawerOpen}
                             username={`${firstname} ${lastname}`}
                             onSignoutClick={this.signOut}
                             onChangePassClick={this.changePass}
                             handleDrawerToggle={this.handleDrawerToggle.bind(this)}
                             isSmallScreem={isSmallScreen}
                            />
                            <div style={appStlyes.content}>
                                <Route exact path={`/customers`} component={CustomerListPage} />
                                <Route path={`/customer/:id`} component={CustomerFormPage} />
                                <Route path={`/newcustomer/`} component={CustomerFormPage} />
                                <Route exact path={`/orders`} component={OrderListPage} />
                                <Route path={`/order/:id`} component={OrderFormPage} />
                                <Route path={`/neworder/`} component={OrderFormPage} />
                                <Route exact path={`/products`} component={ProductListPage} />
                                <Route path={`/product/:id`} component={ProductFormPage} />
                                <Route path={`/newproduct`} component={ProductFormPage} />
                                <Route path={`/about`} component={AboutPage} />
                                <Route path="/changepass" component={ChangePasswordPage} />
                            </div>
                        </div>
                    )}
                    {!isAuthenticated && (
                        <LoginPage onSignInClick={(creds) => this.signIn(creds)}/>
                    )}
                </div>
            </MuiThemeProvider>
        );
    }
}
   
const mapStateToProps = state => {
    const {auth} = state;
    const {isFetching, isAuthenticated, user} = auth;
    return {
        isAuthenticated: isAuthenticated,
        isFetching: isFetching,
        user: user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      signInUser: (action) => dispatch(thunkAuth(action)),
      signOutUser: (action) => dispatch(thunkAuth(action)),
    };
}
  
export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(App)
);

