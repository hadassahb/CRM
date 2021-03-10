import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import ContentAdd from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import { getAction } from "../actions/customer";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { thunkApiCall } from "../services/thunks";
import { LIST_CUSTOMER, DELETE_CUSTOMER, NEW_CUSTOMER } from "../store/types";

import Alert from "../components/Alert";
import DataTable from "../components/DataTable";
import SkeletonList from "../components/SkeletonList";
import DeleteDialog from "../components/DeleteDialog";
import { Grid, Tooltip, Divider } from "@material-ui/core";
import { listPageStyle } from "../styles";
import {
  buildSearchFilters,
  buildJsonServerQuery,
  clearSearchFilters,
} from "../utils/app-utils";

const styles = listPageStyle;

const defaultProps = {
  model: "customer",
  dataKeys: [
    "avatar",
    "firstname",
    "lastname",
    "email",
    "mobile",
    "membership",
    "actions",
  ],
  headers: [
    "",
    "First Name",
    "Last Name",
    "Email",
    "Mobile",
    "Membership",
    "Actions",
  ],
};

class CustomerListPage extends Component{
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSnackBarClose = this.onSnackBarClose.bind(this);
        this.handleNewCustomer = this.handleNewCustomer.bind(this);
        this.handleSearchFilter = this.handleSearchFilter.bind(this);
        this.clearSearchFilter = this.clearSearchFilter.bind(this);
        this.openDialog = this.openDialog.bind(this);
      }

      defaultProps = defaultProps;

      state = {
        isFetching: true,
        open: false,
        searchOpen: false,
        snackbarOpen: false,
        autoHideDuration: 2000,
        page: 1,
        items: [],
        totalPages: 1,
        customerId: null,
        customerList: [],
        search: {
            contain: {
                firstname: "",
                lastname: "",
            },
        },
    };
    
    componentDidMount = () =>{
        this.handleSearch();
    }
    
    componentDidUpdate = (prevProps) => {
        if (this.props.customerList !== prevProps.customerList) {
          this.setState({ customerList: this.props.customerList });
          const page = 1;
          const totalPages = Math.ceil(this.props.customerList.length / 10);
          const items = this.props.customerList.slice(0, 10);
          const isFetching = this.props.isFetching;
          this.setState({ page, totalPages, items, isFetching });
        }
        console.log(" this.props.deleted " + this.props.deleted);
    
        if (
          this.props.deleted !== prevProps.deleted &&
          this.props.deleted === true
        ) {
          this.setState({ snackbarOpen: true });
          this.handleSearch();
        }
      }
    
    onPageChange = (e, page) =>{
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        const items = this.props.customerList.slice(startIndex, endIndex);
        this.setState({ page, items });
      }
    
    openDialog = (e, value) =>{
        if (value != null && value > 0) {
          this.setState({ open: true, customerId: value });
        }
    }
    
    handleToggle = () => {
        this.setState({ searchOpen: !this.state.searchOpen });
    }
    
    handleSearch() {
        const filters = buildSearchFilters(this.state.search);
        const query = buildJsonServerQuery(filters);
        const action = getAction(LIST_CUSTOMER, null, null, query);
        this.props.searchCustomer(action); 
        this.setState({ searchOpen: false, isFetching: true });
    }
    
    closeDialog = (isConfirmed) =>{
        this.setState({ open: false });
    
        if (isConfirmed && this.state.customerId) {
          const action = getAction(
            DELETE_CUSTOMER,
            this.state.customerId,
            null,
            ""
          );
          this.props.deleteCustomer(action);
          this.setState({ customerId: null });
        }
    }
    
    handleSearchFilter = (event) => {
        const field = event.target.name;
        if (event && event.target && field) {
          const search = Object.assign({}, this.state.search);
          search.contain[field] = event.target.value;
          this.setState({ search: search });
        }
    }
    
    clearSearchFilter = () =>{
        const search = Object.assign({}, this.state.search);
        clearSearchFilters(search);
        this.setState({ search : search });
        this.handleSearch()
    }
    
    onSnackBarClose = () => {
        this.setState({
          snackbarOpen: false,
        });
    }
    
    handleNewCustomer = () =>{
        const action = getAction(NEW_CUSTOMER);
        this.props.newCustomer(action);
        this.props.history.push("/newcustomer");
    }
    
  render() {
    var { customerList, headers, dataKeys, model } = this.props;
    var  { isFetching, page, totalPages, items } = this.state;

    console.log(headers);

    return (
      <PageBase
        title={"Customers (" + customerList.length + ")"}
        navigation="React CRM / Customer"
      >
        {isFetching ? (
          <div>
            <SkeletonList />
          </div>
        ) : (
          <div>
            <div>
              <Tooltip title="Add" aria-label="add">
                <Fab
                  size="small"
                  color="secondary"
                  style={styles.fab}
                  onClick={this.handleNewCustomer}
                >
                  <ContentAdd />
                </Fab>
              </Tooltip>
              <Tooltip title="Search" aria-label="search">
                <Fab
                  size="small"
                  style={styles.fabSearch}
                  onClick={this.handleToggle}
                >
                  <Search />
                </Fab>
              </Tooltip>
            </div>
            <Snackbar
              open={this.state.snackbarOpen}
              autoHideDuration={this.state.autoHideDuration}
              onClose={this.onSnackBarClose}
            >
              <Alert onClose={this.onSnackBarClose} severity="success">
                The operation completed successfully !
              </Alert>
            </Snackbar>
            <DataTable
              model={model}
              items={items}
              dataKeys={dataKeys}
              headers={headers}
              page={page}
              totalPages={totalPages}
              onDelete={this.openDialog}
              onPageChange={this.onPageChange}
            />

            <DeleteDialog
              open={this.state.open}
              closeDialog={this.closeDialog}
            />

            <React.Fragment>
              <Drawer
                anchor="right"
                open={this.state.searchOpen}
                onClose={this.handleToggle}
                style={styles.searchDrawer}
              >
                <Grid container spacing={0} style={styles.searchGrid}>
                  <Grid item style={styles.searchField}>
                    <h5>Search</h5>
                  </Grid>
                  <Grid item xs={12} style={styles.searchField}>
                    <TextField
                      placeholder="First Name"
                      label="First Name"
                      name="firstname"
                      fullWidth={true}
                      value={this.state.search.contain.firstname}
                      onChange={this.handleSearchFilter}
                    />
                  </Grid>
                  <Grid item xs={12} style={styles.searchField}>
                    <TextField
                      placeholder="Last Name"
                      label="Last Name"
                      fullWidth={true}
                      name="lastname"
                      value={this.state.search.contain.lastname}
                      onChange={this.handleSearchFilter}
                    />
                  </Grid>
                  <Divider />
                  <Grid item xs={12} style={styles.searchField}>
                    <Button
                      variant="contained"
                      onClick={this.handleSearch}
                      color="secondary"
                      style={styles.searchButton}
                    >
                      Search
                    </Button>
                    <Button
                      variant="contained"
                      onClick={this.clearSearchFilter}
                      color="default"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Drawer>
            </React.Fragment>
          </div>
        )}
      </PageBase>
    );
  }
}

const mapStateToProps = state => {
    var {
      customerList,
      isFetching,
      errorMessage,
      user,
      deleted,
    } = state.customer;
  
    return {
      customerList,
      isFetching,
      errorMessage,
      user,
      deleted,
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
      searchCustomer: (action) => dispatch(thunkApiCall(action)),
      deleteCustomer: (action) => dispatch(thunkApiCall(action)),
      newCustomer: (action) => dispatch(thunkApiCall(action)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);