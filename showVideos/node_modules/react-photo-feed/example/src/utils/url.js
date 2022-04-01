import React from 'react';

export function getLastPartOfUrl (url) {
    let matches = url.match(/\/([^/]*)([/]*)$/);
    return matches && matches.length > 1 ? matches [1] : null;
}