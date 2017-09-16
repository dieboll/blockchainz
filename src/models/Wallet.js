var m = require('mithril')

const endpoint = 'https://api.blockcypher.com/v1/btc/main/addrs'

var Wallet = {
    address: undefined,
    transactions: [],
    loadTransactions: function() {
        if(Wallet.address) {
            return m.request({
                method: 'GET',
                url: endpoint,
            })
                .then( (result) => Wallet.transactions = result.txs )
                .catch( (e) => console.log(e) )
        }
    },
}

module.exports = Wallet
