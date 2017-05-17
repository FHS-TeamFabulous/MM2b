import React from 'react';
import $ from 'jquery';
import turn from 'app/vendors/turn';
import style from './styles.scss';
import { Button } from 'react-bootstrap';
import AngleRightIcon from 'react-icons/lib/fa/angle-right';
import AngleLeftIcon from 'react-icons/lib/fa/angle-left';

export default class BookReader extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillMount() {
        const { width, height } = calcBookSize(
            this.props.book.dimensions.width,
            this.props.book.dimensions.height,
            window.innerWidth,
            window.innerHeight
        );

        this.width = width;
        this.height = height;
    }

    componentDidMount() {
        this.$flipbook = $(this.refs.readerBook);
        this.$nextBtn = $(this.refs.nextBtn);
        this.$prevBtn = $(this.refs.prevBtn);

        this.$flipbook.turn({
            width: this.width,
            height: this.height,
            autoCenter: true
        });

        this.$flipbook.on('turning', this.onPageTurn.bind(this));
        this.handleControlsVisibility();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.page !== nextProps.page) {
            this.$flipbook.turn('page', nextProps.page);
        }
    }

    componentWillUnmount() {
        this.$flipbook.turn('destroy').bind(this.refs.reader);
    }

    onPageTurn(event, page) {
        this.props.onChangePage(page);
        this.handleControlsVisibility(page);
    }

    handleControlsVisibility(page = 1) {
        const pageCount = this.props.book.pages.length;

        if (page === 1) {
            this.$prevBtn.hide();
        } else if (pageCount - page <= 1) {
            this.$nextBtn.hide();
        } else {
            this.$nextBtn.show();
            this.$prevBtn.show();
        }
    }

    pagePrev() {
        this.$flipbook.turn('previous');
    }

    pageNext() {
        this.$flipbook.turn('next');
    }

    render() {
        const { pages } = this.props.book;
        const containerStyle = {
            width: this.width
        };

        return (
            <div style={containerStyle} className={style.container}>
                <div ref='prevBtn'>
                    <Button onClick={this.pagePrev.bind(this)} className={ style.btnPrev }>
                        <AngleLeftIcon />
                    </Button>
                </div>
                <div ref='readerBook' className={ style.book }>
                    {
                        pages.map(page => {
                            return (
                                <div key={ page.url } className={ style.page }>
                                    <img src={`${page.url}`}/>
                                </div>
                            );
                        })
                    }
                </div>
                <div ref='nextBtn'>
                    <Button ref='nextBtn' onClick={this.pageNext.bind(this)} className={ style.btnNext }>
                        <AngleRightIcon />
                    </Button>
                </div>
            </div>
        );
    }
}

BookReader.defaultProps = {
    pages: [],
    onChangePage: () => {}
};

function calcBookSize(pageWidth, pageHeight, windowWidth, windowHeight) {
    let width = pageWidth * 2;
    let height = pageHeight;
    let aspectRatio = width / height;
    let bookVerticalMargin = 200;
    let bookHorizontalMargin = 200;

    if (height > (windowHeight - bookVerticalMargin)) {
        let overflow = height - (windowHeight - bookVerticalMargin);
        height = height - overflow;
        width = height * aspectRatio;
    } 

    if (width > (windowWidth - bookHorizontalMargin)) {
        let overflow = width - (windowWidth - bookHorizontalMargin);
        width = width - overflow;
        height = width / aspectRatio;   
    }

    return { width, height };
}
