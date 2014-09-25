angular.module
(

    'app.task',
    [



    ],

    function ()
    {



    }

)

.factory
(

    'taskStorage',

    function ()
    {

        var storageId = 'tasks';
        var demoTasks = '[' +
            '{"title": "Finish homework", "completed": true},' +
            '{"title": "Make a call", "completed": true},' +
            '{"title": "Build a snowman :)", "completed": false},' +
            '{"title": "Apply for monster university!", "completed": false},' +
            '{"title": "Play games with friends", "completed": true},' +
            '{"title": "Shopping", "completed": false}' +

        ']';

        return {

            get: function ()
            {

                return JSON.parse(localStorage.getItem(storageId) || demoTasks);

            },

            put: function (tasks)
            {

                return localStorage.setItem(storageId, JSON.stringify(tasks));

            }

        };

    }

)

.directive
(

    'taskFocus',
    [

        '$timeout',

        function ($timeout)
        {

            return {

                link: function (scope, ele, attrs)
                {

                    scope.$watch(attrs.taskFocus,
                    function (newVal)
                    {

                        if(newVal)
                        {

                            $timeout(function()
                            {

                                ele[0].focus();

                            }, 0, false);

                        }

                    });

                }

            };

        }

    ]

)

;