var m = require('mithril')
var t = require('three')
var Wallet = require('./models/Wallet')
var WalletVis = require('./views/WalletVis')

var Main = {
    view: function() {
        return m('main', [
            m('h1', 'Hello World!'),
            m(WalletVis),
        ])
    }
}

m.mount(document.body, Main)
