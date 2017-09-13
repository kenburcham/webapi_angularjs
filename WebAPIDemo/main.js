
/* could create the IdeaService as a factory and pass it in instead. then you can use it in more than one controller...
mod.factory('IdeaService', ['$resource', function ($resource) {
    return $resource('/api/ideass', {}, {
        query: { method: 'GET', params: {}, isArray: true }
    });
}]);
*/
angular.module('ideaApp', ['ngResource', 'ngRoute'])
    .controller('IdeaListController', ['$resource', function ($resource) {
        var ideaList = this;

        var IdeaService = $resource('/api/ideas', {}, {
            query: { method: 'GET', params: {}, isArray: true }
        }); 

        ideaList.queryIdeas = function () {
            ideaList.ideas = IdeaService.query();
        };

        ideaList.queryIdeas(); 

        ideaList.addIdea = function () {
            var newIdea = new IdeaService({ Name: ideaList.ideaText });
            newIdea.$save(function (idea) {
                ideaList.ideas.push(idea);
            });

            ideaList.ideaText = '';
        };
    }]);

