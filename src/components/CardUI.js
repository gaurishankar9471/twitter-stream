import React from "react";
import "./css/CardUI.css";
import TwitterAnalysis from "./TwitterAnalysis";

class CardUI extends React.Component {
  render() {
    let data = this.props.data;

    return (
     
      <div>
        <article className="article">
          <img
            src={data.user.profile_image_url}
            alt={data.user.name}
            className="circle responsive-img"
          />
          <h2 className="article__title">
            {" "}
            <a
              href={`https://twitter.com/${data.user.screen_name}`}
              target="_blank"
            >{`@${data.user.screen_name}`}</a>{" "}
          </h2>
          <p className="article__excerpt">{data.text}</p>
          <div className="article__title">
            {new Date(data.created_at).toLocaleTimeString()}
          </div>
              <div className="btn-search" >
                <button
                className="button is-info"
                onClick={this.serachTweets}
                type="button"
                  >
                Anaylize Tweet
              </button>
                </div>
                <TwitterAnalysis data={data}> </TwitterAnalysis>

        </article>
      </div>
    );
  }
}

export default CardUI;
