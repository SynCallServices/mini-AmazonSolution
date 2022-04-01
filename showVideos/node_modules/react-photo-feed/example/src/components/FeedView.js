import PropTypes from 'prop-types';
import React from 'react';
import PhotoGrid from './../../../src/components/PhotoGrid';
import RadioButtonGroup from './../../../src/components/RadioButtonGroup';
import styles from './FeedView.css';

const columnsData = [
    {value : 1, label : 'x1'},
    {value : 2, label : 'x2'},
    {value : 3, label : 'x3'},
    {value : 5, label : 'x5'}];
const sortParams = [
    {label : 'oldest', value : 'created-asc'},
    {label : 'newest', value : 'created-desc'},
    {label : 'title asc', value : 'title-asc'},
    {label : 'title desc', value : 'title-desc'}];


class Feed extends React.Component {
    static propTypes = {
        photos : PropTypes.array
    };
    constructor () {
        super ();
        this.state = {
            columns : 2,
            order : null
        }
    }

    render() {
        const {photos} = this.props;
        const { columns, order } = this.state;
        const sortedPhotos = order ? this.getSorted() : photos;

        return (
            <div>
                <RadioButtonGroup items={columnsData} value={columns} onClick={this.onClick.bind(this)}
                                  type="secondary"/>
                <RadioButtonGroup items={sortParams} value={order} onClick={this.onSortClick.bind(this)}
                                  type="default"/>

                <PhotoGrid photos={sortedPhotos} columns={columns}/>
            </div>
        );
    }

    getSorted() {
        const {photos} = this.props;

        const {order} = this.state;
        const [field, type] = order.split('-');
        const sign = type == 'asc' ? 1 : -1;
        return photos.slice().sort((a, b) => (+(a[field] > b[field]) || +(a[field] === b[field]) - 1) * sign);
    }

    onSortClick(item) {
        this.setState({
            order : item == this.state.order ? null : item
        });
    }

    onClick(value) {
        this.setState({
            columns : value
        });

    }
}

export default Feed;
