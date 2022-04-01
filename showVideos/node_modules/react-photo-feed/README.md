# react-photo-feed
Photo gallery, example with public photos feed from Flickr, Yandex

Simple example of photo gallery with responsive image grid, columns customizing, one-column view with description, fullscreen preview with 
one click.  Pure CSS for that.


## Installation
You can use PhotoGrid in your app, just install it from npm

`npm install react-photo-feed`

## Usage

````js
import React from "react";
import ReactDOM from "react-dom";
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";

const demoPhotos = [
	{
		id : 1, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	},
	{
		id : 2, src : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg"
	},
	{
		id : 3, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	},
	{
		id : 4, src : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg"
	},
	{
		id : 5, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	},
	{
		id : 6, src : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg"
	},
	{
		id : 7, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	}
];
ReactDOM.render(
	<div>
		<PhotoGrid columns={3} photos={demoPhotos} />
	</div>,
	document.getElementById('root')
);
`````

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| photos | Array | ✓ | Array of objects, like `[{id: 1, src: 'http://url_to_small_image', bigSrc: 'http://url_to_big_image', title: 'Caption of photo'}]` |
| columns | Number | ✓ | Grid columns, like `columns={1}`, also can be 2,3,5 |
| InformationElement | Function |  | Component used for one-column view |



Also you can see toggle|radio button group.
```javascript
<RadioButtonGroup items={sortParams} value={order} onClick={this.onSortClick.bind(this)} type="default"/>
```
## [Demo](http://lkazberova.github.io/react-photo-feed/)

![Preview](https://s31.postimg.org/e2eejik3v/Untitled_GIF.gif)

Some ideas were inspired by [react-rpg](https://github.com/James-Oldfield/react-rpg)
