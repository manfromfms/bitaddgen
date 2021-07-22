var bitcoin = require("bitcoinjs-lib")
const count = 10000000000
var target = 'abcde'
var str = '1' + target
var result = require('./result.json')
var date1 = Date.now()
console.log('Program has been started')
console.log('Target: 1' + target)
console.log('Difficulty: ' + (Math.pow(36, target.length) / 2000 / 60) + 'm')
for(let i = 0; i < count; i++){
  var keyPair = bitcoin.ECPair.makeRandom()
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
  if(address.toLowerCase().startsWith(str)) {
    result.push({
      add: address,
      pk: keyPair.toWIF(),
      time: Date.now() - date1
    })
    console.log(address)
    require('fs').writeFileSync('./result.json', JSON.stringify(result), (err) => {})
  }
  
  if(i % 10000 == 0 && i != 0){
    console.log(i)
    console.log((Math.round(10000 / (Date.now() - date1) * 1000 * 100) / 100) + 'a/s')
    date1 = Date.now()
  }
}
var date2 = Date.now()
console.log(count / (date2 - date1) * 1000)
