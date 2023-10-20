var deleted = {};
var toggled = false;
var xPaths = {
    'top-nav': '//*[@id="top-nav"]/div',
    'app-div': '//*[@id="app"]/div/div[4]',
    'top-nav-div1': '//*[@id="top-nav"]/div/div[1]',
    'instruct-notice': '//*[@id="instruct-notice"]',
    'editor-button-2': '//*[@id="editor-buttons"]/button[2]',
    'widget-33775': '//*[@id="widget-33775"]',
    'movie-player': '//*[@id="movie_player"]/div[16]/div/button[2]',
    'left-pane': '//*[@id="challenges-side"]/div'
};

function zen() {
    Object.keys(xPaths).forEach(function(key) {
        var element = document.evaluate(xPaths[key], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element && !toggled) {
            deleted[key] = element.cloneNode(true);
            element.parentNode.removeChild(element);
        } else if (deleted[key] && toggled) {
            var parentXPath = xPaths[key].substring(0, xPaths[key].lastIndexOf('/'));
            var parentElement = document.evaluate(parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (parentElement) {
                parentElement.appendChild(deleted[key]);
                deleted[key] = null;
            }
        }
    });
    toggled = !toggled;
}

// Run zen() to toggle elements on and off
