angular.module
(

    'app.localization',
    [



    ],

    function ()
    {



    }

)

.factory
(

    'localize',

    [

        '$http', '$rootScope', '$window',

        function ($http, $rootScope, $window)
        {

            var localize =
            {

                language: '',
                url: undefined,
                resourceFileLoaded: false,

                successCallback: function (data)
                {

                    localize.dictionary = data;
                    localize.resourceFileLoaded = true;

                    $rootScope.$broadcast('localizeResourcesUpdated');

                },

                setLanguage: function (value)
                {

                    localize.language = value.toLowerCase().split('-')[0];

                    localize.initLocalizedResources();

                },

                setUrl: function (value)
                {

                    localize.url = value;

                    localize.initLocalizedResources();

                },

                buildUrl: function ()
                {

                    if(!localize.language)
                    {

                        localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase();
                        localize.language = localize.language.split('-')[0];

                    }

                    return 'i18n/resources-locale_' + localize.language + '.js';

                },

                initLocalizedResources: function ()
                {

                    var url = localize.url || localize.buildUrl();

                    $http
                    ({

                        method: "GET",
                        url: url,
                        cache: false

                    })
                    .success(localize.successCallback)
                    .error(function ()
                    {

                        $rootScope.$broadcast('localizeResourcesUpdated');

                    });

                },

                getLocalizedString: function (value)
                {

                    //Not necessary
                    //var result = undefined;

                    if(localize.dictionary && value)
                    {

                        var valueLowerCase = value.toLowerCase();

                        if(localize.dictionary[valueLowerCase] === '')
                        {

                            result = value;

                        }
                        else
                        {

                            result = localize.dictionary[valueLowerCase];

                        }

                    }
                    else
                    {

                        result = value;

                    }

                    return result;

                }

            };

            return localize;

        }

    ]

)

.directive
(

    'i18n',
    [

        'localize',

        function (localize)
        {

            var i18nDirective =
            {

                restrict: 'EA',

                updateText: function (ele, input, placeholder)
                {

                    //var result = undefined;

                    if(input == 'i18n-placeholder')
                    {

                        result = localize.getLocalizedString(placeholder);

                        ele.attr('placeholder', result);

                    }
                    else if(input.length >= 1)
                    {

                        result = localize.getLocalizedString(input);

                        ele.text(result);

                    }

                },

                link: function (scope, ele, attrs)
                {

                    scope.$on
                    (

                        'localizeResourcesUpdated',

                        function ()
                        {

                            i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder);

                        }

                    );

                    attrs.$observe
                    (

                        'i18n',

                        function (value)
                        {

                            i18nDirective.updateText(ele, value, attrs.placeholder);

                        }

                    );

                }

            };

            return i18nDirective;

        }

    ]

)

.controller
(

    'LangController',

    [

        '$scope', 'localize',

        function ($scope, localize)
        {

            $scope.lang = 'English';

            $scope.setLang = function (lang)
            {

                switch(lang)
                {

                    case 'English':

                        localize.setLanguage('EN-US');

                        break;

                    case 'Portuguese (Brasil)':

                        localize.setLanguage('PT-BR');

                        break;

                }

                $scope.lang = lang;

            };

            $scope.getFlag = function ()
            {

                var lang = $scope.lang;

                switch(lang)
                {

                    case 'English':

                        return 'flags-american';

                    case 'Portuguese (Brasil)':

                        return 'flags-portugal';

                }

            };

        }

    ]

)

;