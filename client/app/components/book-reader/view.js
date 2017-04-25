import React from 'react';
import config from 'config';
import $ from 'jquery';
import style from './style.scss';

export default class BookReader extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.enableUpdates;
    }

    componentWillMount() {
        this.enableUpdates = true;
    }

    componentDidMount() {
        this.$node = $(this.refs.reader);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.ready && this.props.ready) {
            this.$node.turn({
                width: this.props.width,
                height: this.props.height,
                autoCenter: true
            });

            this.enableUpdates = false;
        }
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
                    {
                        this.props.pages.map(page => {
                            return (
                                <div key={ page.url } className={ style.page }>
                                    <img src={ `${config.server.base}${page.url}` }/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

BookReader.defaultProps = {
    ready: false,
    pages: []
};
