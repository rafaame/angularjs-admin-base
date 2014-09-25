angular.module
(

    'app',

    [

        // Angular modules
        'ngRoute',
        'ngCookies',
        'ngAnimate',

        'templates-app',
        'templates-common',

        // 3rd Party Modules
        'ui.bootstrap',
        'easypiechart',
        'mgo-angular-wizard',
        'textAngular',
        'ui.tree',
        'ngMap',
        'ngTagsInput',
        'angular-intro',
        'ui.router',

        // Custom modules
        'app.signin',
        'app.dashboard',

        'app.data',
        'app.auth',
        'app.task',
        'app.localization'

    ],

    function ($httpProvider)
    {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    }

)

.config
([

    '$routeProvider',

    function ($routeProvider)
    {

        $routeProvider.otherwise('/dashboard');

    }

])

.controller
(

    'AppController',

    [

        '$scope', '$state', 'authService',

        function ($scope, $state, authService)
        {

            $scope.isLogged = authService.isLogged();

            $scope.$on
            (

                '$stateChangeStart',

                function(event, toState, toParams, fromState, fromParams)
                {

                    console.log(authService.isLogged());
                    console.log(authService.getToken());
                    console.log(toState);

                    $scope.isLogged = authService.isLogged();

                    if(!authService.isLogged() && toState.name != 'signin')
                    {

                        $state.go('signin');

                        event.preventDefault();

                    }

                }

            );

            $scope.$on
            (

                '$stateChangeSuccess',

                function(event, toState, toParams, fromState, fromParams)
                {

                    if(angular.isDefined(toState.data.pageTitle))
                    {

                        $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';

                    }

                }

            );

            $state.go('dashboard');

        }

    ]

)

.controller
(

    'HeaderController',

    [

        '$scope', '$state' ,'authService',

        function ($scope, $state, authService)
        {

            $scope.signout = function ()
            {

                authService.clearToken();

                $state.go('signin');

            };

            $scope.introOptions =
            {

                steps:
                [

                    {

                        element: '#step1',
                        intro: "<strong>Heads up!</strong> You can change the layout here",
                        position: 'bottom'

                    },

                    {

                        element: '#step2',
                        intro: "Select a different language",
                        position: 'right'

                    },

                    {

                        element: '#step3',
                        intro: "Runnable task App",
                        position: 'left'

                    },

                    {

                        element: '#step4',
                        intro: "Collapsed nav for both horizontal nav and vertical nav",
                        position: 'right'

                    }

                ]

            };

        }

    ]

)

.controller
(

    'NavContainerController',

    [

        '$scope',

        function ($scope)
        {



        }

    ]

)

.controller
(

    'NavController',

    [

        '$scope', 'taskStorage', 'filterFilter',

        function ($scope, taskStorage, filterFilter)
        {

            var tasks = $scope.tasks = taskStorage.get();

            $scope.taskRemainingCount = filterFilter(tasks, {completed: false}).length;

            $scope.$on
            (

                'taskRemaining:changed',

                function (event, count)
                {

                    $scope.taskRemainingCount = count;

                }

            );

        }

    ]

)

;