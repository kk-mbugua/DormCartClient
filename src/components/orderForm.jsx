import React, { Component } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputLabel,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import Axios from "axios";
const UsaStates = require("usa-states").UsaStates;

class OrderForm extends Component {
  state = {
    error: false,
    success: false,
    submission_status: "Submission Status",
    hide_submission_status: true,
    full_name: "",
    phone: "",
    email: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    university: "",
    item_name: "",
    item_count: 1,
    items: [],
  };

  initial_state = {
    error: false,
    success: false,
    full_name: "",
    phone: "",
    email: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    university: "",
    item_name: "",
    item_count: 1,
    items: [],
  };

  get_form_data = () => {
    const body = {
      full_name: this.state.full_name,
      email: this.state.email,
      phone: this.state.phone,
      university: this.state.university,
      items: this.state.items,
      delivery_address: {
        street: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip_code,
      },
    };
    return body;
  };

  set_submission_status = () => {

  }

  handleSubmit = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = "https://dorm-cart-server.herokuapp.com/orders/new_order"
    const body = this.get_form_data();
    Axios.post(proxyurl+url, body).then((res) => {
      if(res) {
        this.setState({submission_status: "Successfully Submited", hide_submission_status: false}, ()=> {setTimeout(()=>{this.setState({hide_submission_status: true})}, 5000)} )
      }
    }).catch(err=>{
      this.setState({submission_status: "Failed Submission", hide_submission_status: false}, ()=> {setTimeout(()=>{this.setState({hide_submission_status: true})}, 5000)} )
      if (err.response) {
        console.log("client received an error response (5xx, 4xx)", err)
      } else if (err.request) {
        console.log("client never received a response, or request never left", err)
      } else {
        console.log("nor response or request error", err)
      }
    });
  };

  handleOnChange = (event) => {
    this.setState({ error: false, success: false });
    const variable = event.target.id;
    const value = event.target.value;
    this.setState({ [variable]: value });
  };

  handleOnChangeSelect = (event) => {
    this.setState({ state: event.target.value });
  };

  handleOnClickAdd = () => {
    const item_name = ""
    const item_count = 1
    const item = { name: this.state.item_name, count: this.state.item_count };
    let items = [...this.state.items];
    items.push(item);
    this.setState({ items, item_name, item_count });
  };

  handleOnClickDelete = (item) => {
    const item_name = ""
    const item_count = 1
    let items = [...this.state.items];
    const index = items.findIndex((el) => {
      return item === el;
    });
    items.splice(index, 1);
    this.setState({ items, item_name, item_count });
  };

  render() {
    
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <form autoComplete="off">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <h2 hidden={!this.state.success} style={{ color: "green" }}>
                Order Placed Successfully
              </h2>

              <FormControl
                style={{ margin: "10px", minWidth: "200px" }}
                variant="outlined"
              >
                <InputLabel required variant="outlined">
                  Full Name
                </InputLabel>
                <OutlinedInput
                  id="full_name"
                  label="Enter Full Name"
                  value={this.state.full_name}
                  placeholder="Full Name"
                  required
                  type="text"
                  onChange={(event) => {
                    this.handleOnChange(event);
                  }}
                />
              </FormControl>

              <FormControl
                style={{ margin: "10px", minWidth: "250px" }}
                variant="outlined"
              >
                <InputLabel required variant="outlined">
                  Email Address
                </InputLabel>
                <OutlinedInput
                  id="email"
                  label="Email Address"
                  value={this.state.email}
                  placeholder="Enter Email Address"
                  variant="outlined"
                  required
                  type="email"
                  onChange={(event) => {
                    this.handleOnChange(event);
                  }}
                />
              </FormControl>

              <FormControl
                style={{ margin: "10px", minWidth: "200px" }}
                variant="outlined"
              >
                <InputLabel required variant="outlined">
                  Phone/Mobile Number
                </InputLabel>
                <OutlinedInput
                  id="phone"
                  label="Phone/Mobile Number"
                  value={this.state.phone}
                  placeholder="Enter a Phone/ Mobile Number"
                  variant="outlined"
                  type="tel"
                  required
                  onChange={(event) => {
                    this.handleOnChange(event);
                  }}
                />
              </FormControl>

              <FormControl
                style={{ margin: "10px", minWidth: "200px" }}
                variant="outlined"
              >
                <InputLabel required variant="outlined">
                  University
                </InputLabel>
                <OutlinedInput
                  id="university"
                  label="University"
                  placeholder="University Name"
                  value={this.state.university}
                  variant="outlined"
                  required
                  type="text"
                  onChange={(event) => {
                    this.handleOnChange(event);
                  }}
                />
              </FormControl>

              <Grid container direction="row">
                <FormControl
                  style={{ margin: "10px", minWidth: "400px" }}
                  variant="outlined"
                >
                  <InputLabel required variant="outlined">
                    Street Address
                  </InputLabel>
                  <OutlinedInput
                    id="street_address"
                    label="Street Address"
                    placeholder="Enter Street Address"
                    variant="outlined"
                    required
                    type="text"
                    onChange={(event) => {
                      this.handleOnChange(event);
                    }}
                  />
                </FormControl>

                <FormControl
                  style={{ margin: "10px", minWidth: "200px" }}
                  variant="outlined"
                >
                  <InputLabel required variant="outlined">
                    City
                  </InputLabel>
                  <OutlinedInput
                    id="city"
                    label="City"
                    placeholder="Enter City"
                    variant="outlined"
                    required
                    type="text"
                    onChange={(event) => {
                      this.handleOnChange(event);
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid container direction="row">
                <FormControl
                  style={{ margin: "10px", minWidth: "200px" }}
                  variant="outlined"
                >
                  <InputLabel required variant="outlined">
                    State
                  </InputLabel>
                  <Select
                    id="state"
                    label="State"
                    placeholder="Select State"
                    variant="outlined"
                    value={this.state.state}
                    onChange={this.handleOnChangeSelect}
                  >
                    {new UsaStates().states.map((state) => {
                      return (
                        <MenuItem
                          value={state.abbreviation}
                          key={state.abbreviation}
                        >
                          {state.abbreviation}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  style={{ margin: "10px", minWidth: "100px" }}
                  variant="outlined"
                >
                  <InputLabel required variant="outlined">
                    Zip Code
                  </InputLabel>
                  <OutlinedInput
                    id="zip_code"
                    label="Zip Code"
                    placeholder="Zip"
                    variant="outlined"
                    required
                    type="text"
                    onChange={(event) => {
                      this.handleOnChange(event);
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid container direction="row">
                <FormControl
                  style={{ margin: "10px", minWidth: "200px" }}
                  variant="outlined"
                >
                  <InputLabel required variant="outlined">
                    Item Name
                  </InputLabel>
                  <OutlinedInput
                    id="item_name"
                    label="Item Name"
                    value={this.state.item_name}
                    type="text"
                    variant="outlined"
                    required
                    onChange={(event) => {
                      this.handleOnChange(event);
                    }}
                  />
                </FormControl>

                <FormControl
                  style={{ margin: "10px", maxWidth: "100px" }}
                  variant="outlined"
                >
                  <InputLabel required variant="outlined">
                    #
                  </InputLabel>
                  <OutlinedInput
                    id="item_count"
                    label="#"
                    value={this.state.item_count}
                    type="number"
                    variant="outlined"
                    required
                    onChange={(event) => {
                      this.handleOnChange(event);
                    }}
                  />
                  <Button onClick={this.handleOnClickAdd}>Add</Button>
                </FormControl>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell> Number</TableCell>
                      <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.items.map((item) => {
                        return (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.count}</TableCell>
                            <TableCell>
                              <Button
                                onMouseUp={() => {
                                  this.handleOnClickDelete(item);
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <h2 hidden={!this.state.error} style={{ color: "red" }}>
                ERROR
              </h2>
              <Grid container direction="row">
                    <Button onMouseUp={() => this.handleSubmit()}>Submit</Button> 
                    <p hidden={this.state.hide_submission_status}>{this.state.submission_status}</p>
                    </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default OrderForm;
