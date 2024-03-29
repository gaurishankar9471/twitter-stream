import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import socketIOClient from "socket.io-client";
import CardUI from "./CardUI";
import "./css/SearchBar.css";
import "bulma";
import "./css/loader.css";
import "./css/TwitterStremListView.css";

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

  //Function to search tweets
  serachTweets() {
    let term = this.state.searchTerm;
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ term })
    });
  }

  componentDidMount() {
    document.getElementById("p_bar").style.display = "block";

    const socket = socketIOClient("http://localhost:3000/");

    //Establish Connect to Sever
    socket.on("connect", () => {
      console.log("Socket Connected");
      socket.on("tweets", data => {
        console.info(data);
        let newList = [data].concat(this.state.items.slice(0, 15));
        this.setState({ items: newList });
        document.getElementById("p_bar").style.display = "none";
      });
    });
    socket.on("disconnect", () => {
      document.getElementById("p_bar").style.display = "none";
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
      <div id="top-cont" style={{ backgroundColor: "#4C4B4B" }}>
        <div className="center">
          <div id="p_bar" class="loading">
            Loading&#00000;
          </div>
          <h1 className="top-text">Welcome to Twitter Stream</h1>
          <section className="section">
            <form className="form" id="addItemForm">
              <input
                type="text"
                className="input"
                id="addInput"
                placeholder="Enter any hashtag to stream"
                onChange={this.handleChange}
              />
              <div className="btn-search">
                <button
                  className="button is-info"
                  onClick={this.serachTweets}
                  type="button"
                >
                  Search
                </button>
              </div>
            </form>
          </section>
          <div className="container">
            <hr />
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

export default TwitterStreamListView;
