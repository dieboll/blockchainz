var m = require('mithril');
var three = require('three');
var Wallet = require('../models/Wallet');
var Vis = require('../vis');

const placeholder = 'Enter Bitcoin address';

var vis = undefined;

module.exports = {
    oncreate: function(vnode) {
        // this is vnode.state
        // init threejs here
        let renderer = new three.WebGLRenderer();
        renderer.setClearColor( 0x222222 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( 200, 200 );
        vnode.dom.append(renderer.domElement);
        ctx = renderer.context;
        vis = new Vis(ctx, renderer.domElement, 200, 200);
    },
    onupdate: function(vnode) {
        // update threejs here
    },
    onremove: function(vnode) {
        // shut threejs down here
    },
    view: function() {
        return m('vis', [
            m('input', {
                type: 'text',
                placeholder,
                onInput: function() {
                    //update Wallet.address here
                }
            }),
            m('three-container', [])
        ]);
    }
};
