var CryptoJS = require('crypto-js');

exports.genGameHash = function(serverSeed) {
    return CryptoJS.SHA256(serverSeed).toString();
};


exports.crashPointFromBustabit = function(seed) {
    const nBits = 52; // number of most significant bits to use

    // 1. HMAC_SHA256(message=seed, key=salt) 

    const hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(seed), '0000000000000000004d6ec16dafe9d8370958664c1dc422f452892264c59526');
    seed = hmac.toString(CryptoJS.enc.Hex);

    // 2. r = 52 most significant bits
    seed = seed.slice(0, nBits / 4);
    const r = parseInt(seed, 16);

    // 3. X = r / 2^52
    let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)

    // 4. X = 99 / (1-X)
    X = 99 / (1 - X);

    // 5. return max(trunc(X), 100)
    const result = Math.floor(X);
    return Math.max(1, result / 100);
};