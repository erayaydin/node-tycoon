function Player() {
    this.money      = 0;
    this.inc        = 1;
    this.lastupdate = process.hrtime()[0];
}

Player.prototype.control = function control() {
    var now = process.hrtime()[0];
    var lastupdate = this.lastupdate;
    var difsec = Math.round(now - lastupdate);
    if(!difsec < 1){
        var curMoney = this.money;
        var earned = difsec * this.inc;
        this.money = curMoney + earned;
        this.lastupdate = process.hrtime()[0];

        return this.money;
    }
};

Player.prototype.increase = function increase(value) {
    this.inc += value;
    this.control();
};

Player.prototype.decrease = function decrease(value) {
    this.inc -= value;
    this.control();
};

module.exports = Player;