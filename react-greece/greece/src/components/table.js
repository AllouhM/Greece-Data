import React, { Component } from "react";

class Table extends Component {
  render() {
    const { data } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>link</th>
            <th>location_country</th>
            <th>location_city</th>
            <th>location_address</th>
            <th>location_coordinates_lat</th>
            <th>location_coordinates_lng</th>
            <th>size_parcelm2</th>
            <th>size_grossm2</th>
            <th>size_netm2</th>
            <th>size_rooms</th>
            <th>price_value</th>
            <th>price_currency</th>
            <th>description</th>
            <th>title</th>
            <th>images</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr>
              <td>{row.link}</td>
              <td>{row.location_country}</td>
              <td>{row.location_city}</td>
              <td>{row.location_address}</td>
              <td>{row.location_coordinates_lat}</td>
              <td>{row.location_coordinates_lng}</td>
              <td>{row.size_parcelm2}</td>
              <td>{row.size_grossm2}</td>
              <td>{row.size_netm2}</td>
              <td>{row.size_rooms}</td>
              <td>{row.price_value}</td>
              <td>{row.price_currency}</td>
              <td>{row.description}</td>
              <td>{row.title}</td>
              <td>{row.images}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default Table;
