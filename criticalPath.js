var css = require('css');

function replaceCriticalPathClasses(data, criticalClass) {
    var obj = css.parse(data);
    var rules = obj['stylesheet']['rules'];
    var newRules = [];

    getCriticalPathRules(rules, newRules, criticalClass);

    obj['stylesheet']['rules'] = newRules;
    result = css.stringify(obj, {'indent': '    '});
    return result;
}

function getCriticalPathRules(rules, newRules, criticalClass) {
    for (var i = 0; i < rules.length; i++) {
        var item = rules[i];

        if (item['type'] === 'rule') {
            replaceClassIfCriticalPath(item, newRules, criticalClass);
        } else if (item['type'] === 'media') {
            var mediaRules = item['rules'];
            var newMediaRules = [];
            getCriticalPathRules(mediaRules, newMediaRules, criticalClass);

            item['rules'] = newMediaRules;
            newRules.push(item);
        } else if(item['type'] === 'font-face') {
            continue;
        } else if(item['type'] === 'charset') {
            continue;
        } else {
            newRules.push(item);
        }
    }
}

function replaceClassIfCriticalPath(item, newRules, criticalClass) {
    var selectors = item['selectors'];

    for (var j = 0; j < selectors.length; j++) {
        var canonizedSelectors = selectors[j].split('.');

        if(isTag(canonizedSelectors)) {
            newRules.push(item);
            continue;
        }

        for (var k = 0; k < canonizedSelectors.length; k++) {
            var canonizedSelector = canonizedSelectors[k];
            if (canonizedSelector === '')
                continue;

            if (isCritical(canonizedSelector, criticalClass)) {
                selectors[j] = selectors[j].replace(criticalClass, '');
                item['selectors'] = selectors;
                newRules.push(item);
            }
        }
    }
}

function isTag(canonizedSelectors) {
    return canonizedSelectors.length === 1;
}

function isCritical(className, criticalClass) {
    var hasCriticalIdentifier = className.indexOf(criticalClass, 0) !== -1;
    return hasCriticalIdentifier;
}

module.exports.removeUnusedClassesFromCss = replaceCriticalPathClasses;

