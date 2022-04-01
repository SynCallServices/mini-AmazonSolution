import PropTypes from 'prop-types';
import React from 'react';
import styles from './RadioButtonGroup.css';

class RadioButtonGroup extends React.Component {
    static propTypes = {
        items : PropTypes.array,
        value : PropTypes.string,
        onClick : PropTypes.func,
        type : PropTypes.string
    };

    render() {
        const {items,type} = this.props;
        const itemElements = items.map(this.getItemElement);
        const typeStyle = type == 'default' ? '' : styles.secondaryButton;
        return (
            <div className={[styles.buttons, typeStyle].join(' ')}>
                {itemElements}
            </div>
        );
    }

    getItemElement = (item) => {
        const {value} = this.props;
        const className = value == item.value ? this.getSelectedClassName() : '';
        return (
            <a key={item.value+item.label} href="#" className={className}
               onClick={this.onClick(item.value).bind(this)}>{item.label}</a>
        );
    };

    getSelectedClassName() {
        const {type} = this.props;
        switch (type) {
            case 'default' :
                return styles.defaultButtonSelected;
            case 'secondary' :
                return styles.secondaryButtonSelected;
        }
    }

    onClick(value) {
        return function () {
            this.props.onClick(value);
        };
    }
}

export default RadioButtonGroup;