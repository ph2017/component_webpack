    require('../css/index.css');
    require('../css/carousel.css');
    require('../css/goTo.css');
    require('../css/sinaNews.css');

    // var jqueryTest = require('./math/jqueryTest');
    // jqueryTest.getBodyContent();

    // var $ = require('jquery');
    $(function() {
        let carousel = require('./component/carousel');
        let imgArr = ['http://cdn.jirengu.com/book.jirengu.com/img/26.jpg', 'http://cdn.jirengu.com/book.jirengu.com/img/25.jpg', 'http://cdn.jirengu.com/book.jirengu.com/img/24.jpg', 'http://cdn.jirengu.com/book.jirengu.com/img/23.jpg']

        carousel.init($('.carousel'), imgArr);
        // carousel.init($('.carousel'));

        var goTo = require('./component/goTo');
        goTo.init($('body'), $('.carousel').eq(0), 'Go Top');

        var sinaNews = require('./component/sinaNews');
        window.sinaNews = sinaNews;
        sinaNews.default.init($('.water-fall-ct'), $('.water-fall-ct .item'), $('.load-more'), 9);
    });