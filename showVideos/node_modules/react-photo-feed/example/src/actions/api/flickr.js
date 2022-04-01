import $ from 'jquery';
import { LOAD_PUBLIC_FEED, _SUCCESS, _FAIL, _START } from './../constants';
import {FLICKR_PUBLIC_FEED_URL, SUFFIX_SMALL_240, SUFFIX_LARGE_1024,SUFFIX_SMALL_320} from '../../constants/flickr';
import {getLastPartOfUrl} from '../../utils/url';
import AppDispatcher from '../../dispatcher';


export function loadPublicFeed() {

    AppDispatcher.dispatch({
        type : LOAD_PUBLIC_FEED + _START
    });

    $.getJSON(FLICKR_PUBLIC_FEED_URL)
        .done(response => {
            let photos = response.items.map(item => ({
                title : item.title,
                id : getLastPartOfUrl(item.link),
                link : item.link,
                src : item.media.m.replace(SUFFIX_SMALL_240, SUFFIX_SMALL_320),
                bigSrc : item.media.m.replace(SUFFIX_SMALL_240, SUFFIX_LARGE_1024),
                author : item.author,
                created : Date.parse(item.published),
                tags : item.tags
            }));

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