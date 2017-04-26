import React from 'react';
import config from 'config';
import turn from 'app/vendors/turn';
import $ from 'jquery';
import style from './style.scss';

export default class BookReader extends React.Component {
    shouldComponentUpdate() {
        return !this.bookPluginStarted;
    }

    componentWillMount() {
        this.bookPluginStarted = false;
    }

    componentDidMount() {
        this.$node = $(this.refs.reader);
        this.$node.bind('turned', (event, page) => {
            this.props.setPage(page);
        });
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.ready && this.props.ready) {
            this.$node.turn({
                width: this.props.width,
                height: this.props.height,
                autoCenter: true
            });

            this.bookPluginStarted = true;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentPage !== nextProps.currentPage && this.bookPluginStarted) {
            this.$node.turn('page', nextProps.currentPage);
        }
    }

    componentWillUnmount() {
        this.$node.turn('destroy');
    }

    render() {
        return (
            <div>
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
