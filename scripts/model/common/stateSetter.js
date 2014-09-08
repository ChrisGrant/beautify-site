var ko = require('knockout');

function StateSetter(config) {
    this.state = config.state;
    this.propertyName = config.propertyName;
    this.value = config.value;
}

module.exports = StateSetter;
