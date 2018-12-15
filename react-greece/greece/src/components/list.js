import React, { Component } from "react";
import { Table } from "react-bootstrap";
class List extends Component {
  state = { houses: [] };

  componentDidMount() {
    this.getHouses();
  }
  getHouses = () => {
    fetch("http://localhost:3120/list")
      .then(res => res.json())
      .then(res => this.setState({ houses: res }))

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { houses } = this.state;

    return (
      <Table id="zoz" striped bordered condensed hover>
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
          {houses.map(house => (
            <tr>
              <td>{house.link}</td>
              <td>{house.location_country}</td>
              <td>{house.location_city}</td>
              <td>{house.location_address}</td>
              <td>{house.location_coordinates_lat}</td>
              <td>{house.location_coordinates_lng}</td>
              <td>{house.size_parcelm2}</td>
              <td>{house.size_grossm2}</td>
              <td>{house.size_netm2}</td>
              <td>{house.size_rooms}</td>
              <td>{house.price_value}</td>
              <td>{house.price_currency}</td>
              <td>{house.description}</td>
              <td>{house.title}</td>
              <td>{house.images}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
export default List;
