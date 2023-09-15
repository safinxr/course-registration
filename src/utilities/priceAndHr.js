export default function priceAndHr(allData) {
    let price =0;
    let hr =0;
    for(const data of allData ){
        price = price + data.price
        hr = hr + data.credit_hour
    }
    let remainingHr = 20 - hr;
    return {price, hr, remainingHr}
};
