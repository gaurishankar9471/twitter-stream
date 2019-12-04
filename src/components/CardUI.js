import React from 'react';
import './css/CardUI.css'

class CardUI extends React.Component {
    render() {
        let data = this.props.data;

        return (
            <div>

            <article className="article">
            <img src={data.user.profile_image_url} alt={data.user.name} className="circle responsive-img" />
            <h2 className="article__title"> <a href={`https://twitter.com/${data.user.screen_name}`} target="_blank">{`@${data.user.screen_name}`}</a> </h2>
            <p className="article__excerpt">{data.text}</p>
            </article>
           

            </div>
        );
    }
}

export default CardUI;