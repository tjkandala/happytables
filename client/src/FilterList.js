import React, { Component } from "react";
import Collapsible from "react-collapsible";

class FilterList extends Component {
  render() {
    return (
      <div
        className="FilterList"
        style={{
          margin: "0 auto 10px",
          textAlign: "center"
        }}
      >
        <Collapsible trigger="Filters v" open={true}>
          <ul>
            {this.props.filters.map((filter, index) => {
              return (
                <p key={index}>
                  <b>{filter[0]}</b>: Category: <i>{filter[1]}</i> | Location:
                  <i>{filter[2]}</i> | Price: <i>{filter[3]}</i>
                </p>
              );
            })}
          </ul>
        </Collapsible>
      </div>
    );
  }
}

export default FilterList;
