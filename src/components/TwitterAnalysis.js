import React, { Component } from 'react'
import WordCloud from 'react-d3-cloud';
import { PieChart } from 'react-charts-d3';
import './css/TwitterAnalysis.css'
import axios from 'axios';
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

class TwitterAnalysis extends Component {

    render() {
        let data = this.props.data;
        const fontSizeMapper = word => Math.log2(word.value) * 5;
        const rotate = word => word.value % 360;
        console.log(data)
        var i=0;
        var str = data.text;
        var str_arr = str.split(" ");

        var dataNew = [];
        for( i=0 ; i<str_arr.length; i++){
            var obj = { text: str_arr[i], value: Math.random() * 1000};
            dataNew.push(obj);
        }

        let term = data.text;
        const result = sentiment.analyze("i love you win great");
        console.log(Object.keys(result.positive).length)
          
         console.log(result)
          
          const dataChart = [
            { label: 'Score', value : result.score },
            { label: 'Comparative', value: result.comparative },
            { label: 'Word', value: Object.keys(result.words).length },
            { label: 'Positive', value: Object.keys(result.positive).length},
            { label: 'Negative', value :Object.keys(result.negative).length},


          ];
        return (
            <div style={{backgroundColor: "#4C4B4B"}}>
            <div className="word-cloud">
                    <h1>World CLoud Using d3Js</h1>
                    <h4>Teewt :{data.text}
                    </h4>
                    <WordCloud 
                    data={dataNew}
                    fontSizeMapper={fontSizeMapper}
                    rotate={rotate}/>
            </div>
           

            <div className="tweet-senti">
                <h1>Tweet Sentiments Analysis Result</h1>
                <h4>Score : {result.score}</h4>
                <h4>Comparative : {result.comparative}</h4>
                <h4>Word : {result.words.join(", ")}</h4>
                <h4>Positive : {result.positive.join(", ")}</h4>
                <h4>Negative : {result.negative.join(", ")}</h4>

               



            </div>
            <div className="d3-chart" style={{backgroundColor: "#FFFFFF"}}>
                <h1> Sentiment Analysis using D3 Chart</h1>
                <div className="d3-pie">
                   <PieChart data={dataChart} />

                </div>

            </div>
            </div>

        )
    }
}

export default TwitterAnalysis;