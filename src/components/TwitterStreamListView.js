import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import socketIOClient from "socket.io-client";
import CardUI from "./CardUI";
import "./css/SearchBar.css";
import "bulma";

class TwitterStreamListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], searchTerm: "WestBengal" };

    this.handleChange = this.handleChange.bind(this);
    this.serachTweets = this.serachTweets.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  serachTweets() {
    let term = this.state.searchTerm;
    console.log("Here 1" + term);
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ term })
    });
  }

  componentDidMount() {
    const socket = socketIOClient("http://localhost:3000/");

    socket.on("connect", () => {
      console.log("Socket Connected");
      socket.on("tweets", data => {
        console.info(data);
        let newList = [data].concat(this.state.items.slice(0, 15));
        this.setState({ items: newList });
      });
    });
    socket.on("disconnect", () => {
      socket.off("tweets");
      socket.removeAllListeners("tweets");
      console.log("Socket Disconnected");
    });
  }

  render() {
    let items = this.state.items;

    let itemsCards = (
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {items.map((x, i) => (
          <CardUI key={i} data={x} />
        ))}
      </CSSTransitionGroup>
    );

    return (
      <div>
        <div className="center">
          <div className="container">
            <hr />
            <section className="section">
              <form className="form" id="addItemForm">
                <input
                  type="text"
                  className="input"
                  id="addInput"
                  placeholder="Enter any hashtag to stream"
                  onChange={this.handleChange}
                />
                <button
                  className="button is-info"
                  onClick={this.serachTweets}
                  type="button"
                >
                  Search
                </button>
              </form>
            </section>
          </div>
        </div>
        <div>
          <div>{itemsCards}</div>
        </div>
        <div className="col s12 m4 l4"></div>
      </div>
    );
  }
}

const controlStyle = {
  marginRight: "5px"
};

export default TwitterStreamListView;
