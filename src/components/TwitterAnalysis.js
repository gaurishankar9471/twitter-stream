import React, { Component } from 'react'
import WordCloud from 'react-d3-cloud';
import { PieChart } from 'react-charts-d3';
import './css/TwitterAnalysis.css'

class TwitterAnalysis extends Component {

    render() {
        let data = this.props.data;
        const fontSizeMapper = word => Math.log2(word.value) * 5;
        const rotate = word => word.value % 360;

        const datas = [
            { text: 'Hey', value: 1000 },
            { text: 'lol', value: 200 },
            { text: 'first impression', value: 800 },
            { text: 'very cool', value: 1000000 },
            { text: 'duck', value: 10 },
          ];
          const dataChart = [
            { label: 'Group 1', value: 23 },
            { label: 'Group 2', value: 15 },
            { label: 'Group 2', value: 19},
            { label: 'Group 2', value: 19},


          ];
        return (
            <div style={{backgroundColor: "#4C4B4B"}}>
            <div className="word-cloud">
                    <h1>World CLoud Using d3Js</h1>
                    <h4>Teewt :{data.text}
                    </h4>
                    <WordCloud 
                    data={datas}
                    fontSizeMapper={fontSizeMapper}
                    rotate={rotate}/>
            </div>
           

            <div className="tweet-senti">
                <h1>Tweet Sentiments</h1>

                <h3>positive : Ture</h3>

            </div>
            <div className="d3-chart" style={{backgroundColor: "#FFFFFF"}}>
                <h1> Sentiment Analysis using D3 Chart</h1>
                <PieChart data={dataChart} />

            </div>
            </div>

        )
    }
}

export default TwitterAnalysis;