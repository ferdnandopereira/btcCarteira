//dependecias
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

//definindo a rede
//bitcoins - rede principal
//testnet - rede de teste
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`

//criacao do mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeed(mnemonic)

//cria a raiz da carteira
let root = bip32.fromSeed(seed, network).address


//cria uma conta - par pvt-pub keys
let conta = root.devirePath(path)
let node = conta.derive(0).derive(0)

let btcEndereco = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcEndereco)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)