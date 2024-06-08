function validDenomination(coin) {
    if ([1, 5, 10, 25, 50, 100].indexOf(coin.denom) !== -1) {
        return true;
    } else {
        return false;
    }
};

function valueFromCoinObject(obj) {
    let {denom = 0, count = 0} = obj;
    return denom * count;
};

function valueFromArray(arr) {
    /* let total = 0
      for (let i = 0; i < arr.length; i++) {
        const coin = arr[i];
        //Used W3 Schools to learn more about isArray functionality, declaring a true of false and being able to handle objects passed through as an array or an object.
        if (Array.isArray(coin)) {
            total += valueFromArray(coin);
        } else {
            total += valueFromCoinObject(coin);
        }
    } */

    //Rerwitting code above to use arrow function
    return arr.reduce((total, coin) => {
        if (Array.isArray(coin)) {
            return total += valueFromArray(coin);
        } else {
            return total += valueFromCoinObject(coin);
        }
    }, 0); //Added on an initial value of the accumulator of 0, as I was encountering issues otherwise 
};

function coinCount(...coinage) {
    return valueFromArray(coinage);
};

module.exports = coinCount; //Exporting the function, as required

//console.log("{}", coinCount({denom: 5, count: 3}));
//console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));

//const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
//console.log("...[{}]", coinCount(...coins));
//console.log("[{}]", coinCount(coins)); 