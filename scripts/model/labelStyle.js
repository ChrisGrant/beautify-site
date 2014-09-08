var MappedStyle = require('./mappedStyle'),
    Text = require('./common/text'),
    TextShadow = require('./common/textShadow');

function LabelStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.title = new Text(copy ? copy.title : undefined);
    this.titleShadow = new TextShadow(copy ? copy.titleShadow : undefined);
}

module.exports = LabelStyle;
