import React from 'react';
import { Link } from 'react-router';

import './SocialMedia.scss';

export default class SocialShareButton extends React.Component {
  render() {
    let href = this.props.url;

let options = {
fill: '#28B6CD',
width: '100px',
height: '100px',
shareThisUrl: 'https://bible.exchange/' + href,
message: this.props.message,
media: 'https://www.bible.exchange/images/be_logo.png'
 	};

    let logo = null;
    let className = '';
    let config = {};

switch (this.props.site) {

    case 'twitter':
        logo = this.twitter(options);
        className = 'social-sharing-buttons social-twitter';
        config.url = 'https://twitter.com/intent/tweet?text=' + options.message;
        break;
    case 'facebook':
        logo = this.facebook(options);
        className = 'social-sharing-buttons social-facebook';
        config.url = 'http://www.facebook.com/sharer/sharer.php?u=' + options.shareThisUrl;
        break;
    case 'googleplus':
        logo = this.googleplus(options);
        className = 'social-sharing-buttons social-gplus';
        config.url = 'http://plus.google.com/share?url=' + options.shareThisUrl;
        break;
    case 'pinterest':
        logo = this.pinterest(options);
        className = 'social-sharing-buttons social-pinterest';
        config.url = 'http://pinterest.com/pin/create/button/?url=' + options.shareThisUrl + '&ampmedia=' + options.media + '&ampdescription=' + options.message;
        break;
    case 'edit':

        logo = this.edit(options);
        className = 'social-sharing-buttons edit-button';
        config.url = href;

        config.handle = this.props.handle
        config.id = this.props.data.id

        break;
    case 'print':
        logo = this.print(options);
        className = 'social-sharing-buttons print-button';
        config.url = href;
        break;
    default:
        return null;

}

if(this.props.site === "edit"){
    return <button className={className} dangerouslySetInnerHTML={logo} onClick={config.handle} data-id={config.id}/>
}else{
    return <a className={className} href={config.url} target='_blank' dangerouslySetInnerHTML={logo} onClick={config.handle} data-id={config.id} />
}

}

  facebook(options) {
    return { __html: '<svg enable-background="new 0 0 32 32" version="1.1" width="' + options.width + '" height="' + options.height + '" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="' + options.fill + '"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4 C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/><path d="M13.597,25.261h3.827v-9.262h2.553l0.338-3.191h-2.891l0.004-1.598c0-0.832,0.079-1.278,1.273-1.278h1.596V6.739h-2.554 c-3.067,0-4.146,1.549-4.146,4.152v1.916h-1.912v3.192h1.912V25.261z"/></g></svg>' };
  }

  googleplus(options) {
	                                                                                                                                                                                                       return { __html: '<svg enable-background="new 0 0 32 32" version="1.1" width="' + options.width + '" height="' + options.height + '" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="' + options.fill + '"><g><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4 C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/></g><path d="M18.204,7.182c0,0-4.049,0-5.435,0c-2.486,0-4.827,1.745-4.827,3.926c0,2.229,1.695,3.962,4.224,3.962 c0.176,0,0.347-0.04,0.515-0.052c-0.166,0.313-0.28,0.65-0.28,1.017c0,0.62,0.332,1.114,0.753,1.524 c-0.316,0-0.625,0.004-0.961,0.004c-3.08,0.001-5.45,1.961-5.45,3.995c0,2.003,2.599,3.258,5.679,3.258 c3.512,0,5.451-1.994,5.451-3.997c0-1.606-0.474-2.568-1.939-3.607c-0.502-0.354-1.46-1.217-1.46-1.725 c0-0.594,0.169-0.887,1.065-1.587c0.916-0.716,1.566-1.57,1.566-2.743c0-1.394-0.6-3.095-1.766-3.095h1.984L18.204,7.182z M16.38,20.473c0.042,0.187,0.068,0.378,0.068,0.572c0,1.619-1.045,2.884-4.038,2.884c-2.129,0-3.666-1.347-3.666-2.966 c0-1.586,1.907-2.908,4.037-2.884c0.495,0.005,0.959,0.086,1.379,0.22C15.316,19.103,16.145,19.558,16.38,20.473z M12.97,14.434 c-1.429-0.041-2.788-1.598-3.034-3.474c-0.246-1.878,0.712-3.314,2.141-3.272c1.428,0.044,2.788,1.55,3.034,3.426 C15.357,12.991,14.399,14.476,12.97,14.434z"/><polygon points="22.612,14.23 22.612,11.585 20.849,11.585 20.849,14.23 18.204,14.23 18.204,15.993 20.849,15.993 20.849,18.638 22.612,18.638 22.612,15.993 25.257,15.993 25.257,14.23 "/></g></svg>' };
  }

  pinterest(options) {
	                                                                                                                                                                                                       return { __html: '<svg enable-background="new 0 0 32 32" version="1.1" width="' + options.width + '" height="' + options.height + '" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="' + options.fill + '"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4 C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/><path d="M24.002,12.466c0,4.658-2.59,8.139-6.407,8.139c-1.283,0-2.488-0.693-2.901-1.481c0,0-0.69,2.736-0.835,3.264 c-0.514,1.866-2.027,3.733-2.144,3.886c-0.082,0.106-0.263,0.073-0.282-0.068c-0.033-0.238-0.418-2.592,0.036-4.513 c0.228-0.964,1.527-6.471,1.527-6.471s-0.379-0.758-0.379-1.879c0-1.76,1.02-3.074,2.29-3.074c1.08,0,1.601,0.81,1.601,1.782 c0,1.086-0.691,2.71-1.048,4.214c-0.298,1.26,0.632,2.288,1.874,2.288c2.25,0,3.765-2.89,3.765-6.314 c0-2.602-1.752-4.551-4.941-4.551c-3.601,0-5.846,2.686-5.846,5.687c0,1.035,0.306,1.765,0.784,2.329 c0.219,0.26,0.25,0.364,0.17,0.662c-0.058,0.219-0.187,0.744-0.243,0.953c-0.079,0.301-0.323,0.408-0.594,0.297 c-1.659-0.677-2.432-2.495-2.432-4.537c0-3.373,2.845-7.418,8.487-7.418C21.019,5.663,24.002,8.943,24.002,12.466z"/></g></svg>' };
  }

  twitter(options) {
	                                                                                                                                                                                                        return { __html: '<svg enable-background="new 0 0 32 32" version="1.1" width="' + options.width + '" height="' + options.height + '" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="' + options.fill + '"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4 C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/><path d="M18.328,8.56c-1.663,0.605-2.714,2.166-2.594,3.874l0.04,0.659l-0.665-0.081c-2.421-0.309-4.537-1.358-6.333-3.121 L7.897,9.017L7.671,9.663c-0.479,1.439-0.173,2.96,0.825,3.982c0.532,0.565,0.412,0.646-0.505,0.309 c-0.319-0.107-0.599-0.188-0.625-0.148c-0.093,0.095,0.226,1.318,0.479,1.803c0.346,0.673,1.051,1.331,1.823,1.722l0.652,0.309 l-0.771,0.013c-0.745,0-0.771,0.013-0.691,0.297c0.266,0.874,1.317,1.803,2.488,2.206l0.825,0.282l-0.718,0.431 c-1.064,0.62-2.315,0.969-3.566,0.995c-0.599,0.013-1.091,0.067-1.091,0.108c0,0.134,1.624,0.887,2.568,1.184 c2.834,0.874,6.2,0.497,8.728-0.996c1.796-1.063,3.592-3.175,4.431-5.22c0.453-1.089,0.905-3.08,0.905-4.034 c0-0.619,0.04-0.7,0.785-1.439c0.439-0.43,0.851-0.901,0.931-1.036c0.133-0.256,0.119-0.256-0.559-0.027 c-1.131,0.404-1.291,0.35-0.731-0.255c0.412-0.43,0.905-1.211,0.905-1.439c0-0.04-0.199,0.027-0.426,0.148 c-0.239,0.135-0.771,0.337-1.171,0.457L22.44,9.543l-0.652-0.444c-0.359-0.242-0.864-0.511-1.131-0.592 C19.978,8.318,18.94,8.345,18.328,8.56z"/></g></svg>' };
  }

  edit(options) {
    return { __html: '<svg enable-background="new 0 0 32 32" version="1.1" width="' + options.width + '" height="' + options.height + '" viewBox="0 0 32 32" xml:space="preserve" id="svg2" ><g fill="' + options.fill + '" id="g4"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4 C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z" id="path6" /></g><text xml:space="preserve" x="5.6949153" y="14.508475" id="text3342" sodipodi:linespacing="125%"><tspan sodipodi:role="line" id="tspan3344" x="5.6949153" y="14.508475" /></text> <g fill="' + options.fill + '" transform="matrix(0.00830418,0,0,-0.00760243,3.7434196,26.646285)" id="g4-3"><path d="m 2265,2921 c -16,-10 -93,-82 -170,-160 l -140,-141 335,-335 335,-335 153,153 c 105,105 155,162 161,185 20,71 7,89 -267,366 -142,142 -271,264 -289,272 -44,19 -82,17 -118,-5 z" id="node1" class="node" /><path d="M 1072,1737 309,973 641,642 C 823,459 976,310 979,310 c 3,0 350,344 771,765 l 765,765 -330,330 c -181,181 -334,330 -340,330 -6,0 -353,-343 -773,-763 z" id="node2" class="node" /><path d="M 206,848 C 204,841 194,788 186,730 168,618 144,478 110,285 70,62 71,70 89,71 c 9,0 36,4 61,9 46,9 203,36 395,70 61,11 157,27 215,36 58,9 107,19 110,21 5,5 -642,653 -653,653 -4,0 -9,-6 -11,-12 z" id="node3" /></g></svg>' };
  }

  print(options) {
    return { __html: '<svg enable-background="new 0 0 32 32" version="1.1" width="' + options.width + '" height="' + options.height + '"viewBox="0 0 32 32" xml:space="preserve" id="printers-svg"><g fill="' + options.fill + '" id="g4"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4 C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z" id="path6" /></g> <g transform="matrix(0.00830418,0,0,-0.00760243,3.7434196,26.646285)" id="g4-3"><g fill="' + options.fill + '" transform="matrix(3.0281745,0,0,-3.3076933,-56.330154,3046.5268)" id="g6"><g id="g8"><g id="g10"><path d="m 898.7,300.7 -143.4,0 0,-290.7 -510.6,0 0,290.7 -143.4,0 c -27.3,0 -49.4,22.1 -49.4,49.4 l 0,349.3 c 0,27.3 22.1,49.4 49.4,49.4 l 112.8,0 0,-80.8 30.6,0 0,322 510.6,0 0,-322 30.6,0 0,80.8 112.8,0 c 27.3,0 49.4,-22.1 49.4,-49.4 l 0,-349.4 c 0,-27.2 -22.1,-49.3 -49.4,-49.3 z M 704.5,862 647,939.2 l -351.5,0 0,-271.2 409,0 0,194 z m 0,-561.3 -409,0 0,-239.9 409,0 0,239.9 z" id="path12" /><rect x="356.60001" y="716.79999" width="296.60001" height="50.799999" id="rect14" /><rect x="356.60001" y="820.59998" width="296.60001" height="50.799999" id="rect16" /></g></g><g id="g18" /><g id="g20" /><g id="g22" /><g id="g24" /><g id="g26" /><g id="g28" /><g id="g30" /><g id="g32" /><g id="g34" /><g id="g36" /><g id="g38" /><g id="g40" /><g id="g42" /><g id="g44" /><g id="g46" /></g></g></svg>' };
  }}