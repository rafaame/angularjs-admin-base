/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module
(

    'app.auth',

    [



    ]

)

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config
(

    function config($stateProvider)
    {



    }

)

/**
 * And of course we define a controller for our route.
 */
.controller
(

    'AuthController',

    [

        '$scope', '$state', '$log', 'authService',

        function ($scope, $state, $log, authService)
        {

            $scope.isLogged = function ()
            {

                return authService.isLogged();

            };

            $scope.auth = function (form)
            {

                $scope.submitted = true;

                if(form.$invalid)
                {

                    return;

                }

                var data = {

                    email: $scope.email,
                    password: $scope.password

                };

                authService
                    .auth(data)
                    .success
                    (

                        function (data, status, headers, config)
                        {

                            console.log(data);

                            $scope.email = null;
                            $scope.password = null;
                            $scope.submitted = false;

                            if(data.success)
                            {

                                authService.storeToken(data.token);

                                $state.go('dashboard');

                            }

                        }

                    )

                    .error
                    (

                        function (data, status, headers, config)
                        {

                            authService.clearToken();

                        }

                    );

            };

            $scope.clear = function ()
            {

                authService.clearToken();

            };

            $scope.canSubmit = function (form)
            {

                return !form.$invalid;

            };

        }

    ]

)

.factory
(

    'authService',

    function ($window, dataService)
    {

        var route = '/admin/auth/login';

        return {

            isLogged: function()
            {

                console.log('isLogged: ' + !!$window.sessionStorage.token);

                return !!$window.sessionStorage.token;

            },

            getToken: function ()
            {

                return $window.sessionStorage.token;

            },

            storeToken: function (token)
            {

                $window.sessionStorage.token = token;

            },


            clearToken: function ()
            {

                delete $window.sessionStorage.token;

            },

            auth: function (data)
            {

                return dataService.post(route, data);

            }

        };

    }

)

;

