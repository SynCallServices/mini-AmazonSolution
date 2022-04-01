import $ from 'jquery';
import { LOAD_PUBLIC_FEED, _SUCCESS, _FAIL, _START } from './../constants';
import AppDispatcher from '../../dispatcher';


export function loadPublicFeed() {
    AppDispatcher.dispatch({
        type : LOAD_PUBLIC_FEED + _START
    });

    $.getJSON('http://api-fotki.yandex.ru/api/podhistory/poddate/?format=json&callback=?')
        .done(response => {
            console.log(response.entries);

            let photos = response.entries.map(item => ({
                title : item.title,
                id : item.id,
                link : item.links.alternate,
                src : item.img.L.href,
                bigSrc : item.img.XXL.href,
                author : item.author,
                created : Date.parse(item.published),
                tags : Object.keys(item.tags).join(',')
            }));
            console.log(photos);

            AppDispatcher.dispatch({
                type : LOAD_PUBLIC_FEED + _SUCCESS,
                response : photos
            });
        })
        .fail((error) => {
            AppDispatcher.dispatch({
                type : LOAD_PUBLIC_FEED + _FAIL,
                error
            })
        });
}
