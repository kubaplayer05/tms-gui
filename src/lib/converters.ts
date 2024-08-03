export function abbreviateNumber(value: number) {
    if (value >= 1000) {
        const suffixes = ["", "k", "m", "b", "t"];
        const suffixNum = Math.floor(("" + value).length / 3);
        let shortValue;
        for (let precision = 3; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
            const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 4) {
                break;
            }
        }
        if (shortValue && shortValue % 1 !== 0) shortValue = shortValue.toFixed(2);
        return shortValue + suffixes[suffixNum];
    }
    return value.toString();
}
