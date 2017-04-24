import React from 'react';
import $ from 'jquery';
import style from './style.scss';

export default class BookReader extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.$node = $(this.refs.reader);
        this.$node.turn({
            width: this.props.width,
            height: this.props.height,
            autoCenter: true
        });
    }

    componentWillUnmount() {
        this.$node.turn('destroy');
    }

    render() {
        const containerStyle = {
            width: this.props.width
        };

        return (
            <div className={ style.container } style={ containerStyle }>
                <div ref="reader" className={ style.book }>  
                    <div className={ style.page }>
                        <img src="/assets/books/Foxy-Joxy-Plays-A-Trick/page-1.jpg"/>
                    </div>
                    <div className={ style.page }>
                        <img src="/assets/books/Foxy-Joxy-Plays-A-Trick/page-2.jpg"/>
                    </div>
                    <div className={ style.page }>
                        <img src="/assets/books/Foxy-Joxy-Plays-A-Trick/page-3.jpg"/>
                    </div>
                    <div className={ style.page }>
                        <img src="/assets/books/Foxy-Joxy-Plays-A-Trick/page-4.jpg"/>
                    </div>
                </div>
            </div>
        );
    }
}
