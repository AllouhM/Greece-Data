import React, { Component } from "react";
import Table from "./table";
class List extends Component {
  state = { houses: [] };

  componentDidMount() {
    this.getHouses();
  }
  getHouses = () => {
    fetch("http://localhost:3120/list")
      //   .then(response => console.log(response.json()))
      .then(res => res.json())
      .then(res => this.setState({ houses: res }))

      .catch(err => {
        console.log(err);
      });
  };

  //   showHouses = ({ link, location_city, price_value }) => (
  //     <div key={link}>
  //       {link},{location_city},{price_value}
  //     </div>
  //   );

  render() {
    return (
      <Table data={this.state.houses} />
      //   <table>
      //     <thead>
      //       <tr>
      //         <th>link</th>
      //         <th>location_city</th>
      //         <th>price_value</th>
      //         <th>link</th>
      //         <th>link</th>
      //         <th>location_city</th>
      //         <th>price_value</th>
      //         <th>link</th>
      //         <th>location_city</th>
      //         <th>price_value</th>
      //         <th>link</th>
      //         <th>link</th>
      //         <th>location_city</th>
      //         <th>price_value</th>
      //         <th>link</th>
      //       </tr>
      //     </thead>
      //     <tbody />
      //     {this.state.houses.map(row => (
      //       <tr>
      //         <td>{row.link}</td>
      //         <td>{row.location_city}</td>
      //         <td>{row.price_value}</td>
      //       </tr>
      //     ))}
      //   </table>
    );

    //   <div>{this.state.houses.map(this.showHouses)}</div>;
    // return <div>test</div>;
  }
}
export default List;
