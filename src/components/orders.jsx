import React, { Component } from "react";
import Axios from "axios";
import { Paper } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";

class Orders extends Component {
  state = {
    page: 0,
    rows_per_page: 10,
    orders: []
  };
  columns = [
      {name: "Full Name", id:"full_name"},
      {name: "Email", id:"email"},
      {name: "Phone", id:"phone"},
      {name: "University", id:"university"},
      {name: "Delivery dAdress", id:"delivery_address"},
      {name: "Items", id:"items"}
  ];

  componentDidMount() {
    this.get_all_orders()
  }

  get_all_orders(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = "https://dorm-cart-server.herokuapp.com/orders/all"
    Axios.get(proxyurl+url).then(res=>{
      console.log(res)
      const data = res.data
      this.setState({orders: data})
    }).catch(err=>{
      if (err.response) {
        console.log("client received an error response (5xx, 4xx)", err)
      } else if (err.request) {
        console.log("client never received a response, or request never left", err)
      } else {
        console.log("nor response or request error", err)
      }
    });
  }

  handleChangePage =(event, new_page)=>{
    this.setState({page: new_page})
  }
  handleChangeRowsPerPage = (event) =>{
    this.setState({rows_per_page: event.target.value, page: 0})
  }

  render_table_row = (order) => {
    delete order.delivery_address._id
    const delivery_address = Object.values(order.delivery_address).join(", ")
    delete order.items._id
    let items = order.items.map(item=>{
      return (
        item.count.toString()+"x "+item.name
      )
    })
    items = items.join(", ")
    return (
      <TableRow key={order._id}>
        <TableCell>{order.full_name}</TableCell>
        <TableCell>{order.email}</TableCell>
        <TableCell>{order.phone}</TableCell>
        <TableCell>{order.university}</TableCell>
        <TableCell>{delivery_address}</TableCell>
        <TableCell>{items}</TableCell>
      </TableRow>
    )
  }

  render() {
    return (
      <Paper style={{overflow: 'auto'}}>
        <TableContainer style={{overflow: 'auto'}}>
          <Table stickyHeader={true} >
            <TableHead style={{position:"sticky", top:0, background: 'blue'}}>
              <TableRow>
                {this.columns.map(column => {
                  return <TableCell key={column.id}>{column.name}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
                {this.state.orders.slice(this.state.page * this.state.rows_per_page, this.state.page * this.state.rows_per_page + this.state.rows_per_page).map(order=>{
                    return (
                        this.render_table_row(order)
                    )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
        component="div"
        count={this.state.orders.length? this.state.orders.length : 0}
        rowsPerPage={this.state.rows_per_page}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default Orders;
