import AppDispatcher from '../dispatcher'
import { LOAD_PUBLIC_FEED } from './constants'
import { loadPublicFeed as loadFlickrPF} from './api/flickr';
import { loadPublicFeed as loadYandexPF} from './api/yandex';

export const loadFlickrPublicFeed = loadFlickrPF;
export const loadYandexPublicFeed = loadYandexPF;
