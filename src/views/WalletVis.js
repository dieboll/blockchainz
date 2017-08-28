var m = require('mithril')
var three = require('three')
var Wallet = require('../models/Wallet')

const placeholder = 'Enter Bitcoin address'

module.exports = {
    oninit: () => {
        Wallet.loadTransactions().then(initVis)
    },
    view: function() {
        return m('vis', [
            m('input', {type: 'text', placeholder}),
            m('three-container', []),
    }
}
