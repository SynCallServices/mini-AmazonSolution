import React from 'react';
import styles from './DefaultInfoElement.css';
export const DefaultInfoElement = (props) => {
    const {photo} = props;
    const date = new Date(photo.created).toLocaleString();
    return (
        <div className={styles.info}>
            <h3>{photo.title}</h3>
            <p>{date}</p>
            <p><a href={photo.link}>{photo.link}</a></p>
            <p>tags: {photo.tags}</p>
        </div>
    );
}
;