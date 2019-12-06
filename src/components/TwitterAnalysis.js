import React, { Component } from "react";
import WordCloud from "react-d3-cloud";
import { PieChart } from "react-charts-d3";
import "./css/TwitterAnalysis.css";
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

class TwitterAnalysis extends Component {
  render() {
    let data = this.props.data;
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;

    var str = data.text;
    var str_arr = str.split(" ");

    //Get data from props.data and format into json to implenment for word-cloud plot START
    var i = 0;
    var dataNew = [];
    for (i = 0; i < str_arr.length; i++) {
      var obj = { text: str_arr[i], value: Math.random() * 1000 };
      dataNew.push(obj);
    }
    //Get data from props.data and format into json to implenment for word-cloud plot END

    //Get data from props.data and format into json to drwa pie chart START
    let term = data.text;
    const result = sentiment.analyze(term);

    const dataChart = [
      { label: "Score", value: result.score },
      { label: "Comparative", value: result.comparative },
      { label: "Word", value: Object.keys(result.words).length },
      { label: "Positive", value: Object.keys(result.positive).length },
      { label: "Negative", value: Object.keys(result.negative).length }
    ];
    //Get data from props.data and format into json to drwa pie chart START

    return (
      <div style={{ backgroundColor: "#4C4B4B" }}>
        {/* Draw WordCloud  ComponentSTART*/}
        <div className="word-cloud">
          <h1>World CLoud Using d3.js</h1>
          <h4>Teewt :{data.text}</h4>
          <WordCloud
            data={dataNew}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
          />
        </div>
        {/* Draw WordCloud Component END*/}

        {/* Analysis Sentiment Component START*/}
        <div className="tweet-senti">
          <h1>Tweet Sentiments Analysis Result</h1>
          <h4>Score : {result.score}</h4>
          <h4>Comparative : {result.comparative}</h4>
          <h4>Word : {result.words.join(", ")}</h4>
          <h4>Positive : {result.positive.join(", ")}</h4>
          <h4>Negative : {result.negative.join(", ")}</h4>
        </div>
        {/* Analysis Sentiment Component END*/}

        {/* Analysis Sentiment using d3.js Pie Chart Component START*/}
        <div className="d3-chart" style={{ backgroundColor: "#FFFFFF" }}>
          <h1> Sentiment Analysis using D3 Chart</h1>
          <div className="d3-pie">
            <PieChart data={dataChart} />
          </div>
        </div>
        {/* Analysis Sentiment using d3.js Pie Chart Component END*/}
      </div>
    );
  }
}

export default TwitterAnalysis;
