
exports.setDateZero = function() {
    var today = Date.now();
    var Ld = new Date(today);
    Ld.setHours(0, 0, 0, 0);
    return Ld;
}


exports.setDateZeroWithParam = function(day) {
    var today = Date.now();
    var Ld = new Date(day);
    Ld.setHours(0, 0, 0, 0);
    return Ld;
}