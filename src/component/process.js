class MonthDay {
    constructor(month, day) {
        this.month = month;
        this.day = day;
    }
}
class myPair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}


function convertDateMDY(dt) {
    let from = dt.split("/");
    return new Date(from[2], from[0] - 1, from[1]);
}

function pipeDateDMY(dt) {
    let res = dt.substring(8, 10) +
        "-" + dt.substring(5, 7) +
        "-" + dt.substring(0, 4);
    return res;
}

function valueMonthDay(month, day) {
    let arr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let res = 0;
    for (let i = 0; i < month; i++) {
        res += arr[i];
    }
    res += day;
    return res;
}

function binarySearch(arr, key) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = parseInt((left + right) / 2);

        if (arr[mid] < key) {
            left = mid + 1;
        } else {
            if (arr[mid] === key) {
                return mid;
            }
            right = mid - 1;
        }
    }
    return -1;
}

function upperBound(arr, key) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = parseInt((left + right) / 2);
        if (arr[mid].value < key) {
            left = mid + 1;
        } else {
            while (arr[mid].value >= key) {
                mid--;
            }
            if (mid === arr.length - 1) {
                return mid;
            } else {
                return mid + 1;
            }
        }
    }
}

function lowerBound(arr, key) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = parseInt((left + right) / 2);
        if (arr[mid].value > key) {
            right = mid - 1;
        } else {
            while (arr[mid].value <= key) {
                mid++;
            }
            if (mid === 0) {
                return mid;
            } else {
                return mid - 1;
            }
        }
    }
}
function convertVietnamese(str) { 
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str= str.replace(/đ/g,"d"); 
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    str= str.replace(/-+-/g,"-");
    str= str.replace(/^\-+|\-+$/g,""); 

    return str; 
}


export {
    MonthDay,
    myPair,
    convertDateMDY,
    lowerBound,
    upperBound,
    binarySearch,
    valueMonthDay,
    pipeDateDMY,
    convertVietnamese,
}