(function () {
    'use strict';

    var path = window.location.pathname.toLowerCase();
    var isLoginPage = path.indexOf('/login.html') !== -1;
    var isAuthenticated = sessionStorage.getItem('document-authenticated') === 'true';

    if (!isLoginPage && !isAuthenticated) {
        window.location.replace(path.indexOf('/documents/') !== -1 ? '../login.html' : 'login.html');
        return;
    }

    document.documentElement.style.userSelect = 'none';
    document.documentElement.style.webkitUserSelect = 'none';

    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });

    document.addEventListener('copy', function (event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData('text/plain', 'Copying is disabled for this document.');
        }
    });

    document.addEventListener('cut', function (event) {
        event.preventDefault();
    });

    document.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });

    document.addEventListener('keydown', function (event) {
        var key = event.key.toLowerCase();
        var blocked = (event.ctrlKey || event.metaKey) && ['a', 'c', 'p', 's', 'u'].indexOf(key) !== -1;
        if (blocked || key === 'f12' || (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].indexOf(key) !== -1)) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
}());
