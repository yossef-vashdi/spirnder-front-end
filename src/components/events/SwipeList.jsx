import { set } from "date-fns/esm";
import React from "react";
import SwipeContainer from "./SwipeContainer";

class SwipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: true,
      list: [
        { name: "nana", id: 1, slide: 1 },
        { name: "baba", id: 2, slide: 1 },
        { name: "gaga", id: 3, slide: 1 },
        { name: "dada", id: 4, slide: 1 },
      ],
      events: [],
    };
  }

  render() {

    return (
      <div>
        {
          this.props.events.map((item, i) => {
            if (i === 0)
              return (
                <SwipeContainer
                  item={item}
                  key={item._id}
                  Change={(e, info) => this.props.Change(e, info)}
                />
              );
          })
        }
      </div>
    );
  }
}

export default SwipeList;
