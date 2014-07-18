'use strict';

var pageContentType = '53c807d654cbba0000ac2caf',
    navigationNodeId = '53c8091354cbba0000ac2cb2',
    grasshopper = require('../lib/grasshopper');

module.exports = function(app){

    app.use(function(req, res){
        var path = req.path.split("?")[0].split("#")[0];

        getNavigation(getContent(path, render(res)));
    });
}

function getNavigation(next){
    var qry = {
        nodes: [navigationNodeId]
    };

    grasshopper.core.content.query(qry).then(
        function(response){
            next(response.results);
        }
    ).done();
}

function getContent(path, next){
    return function(nav){
        var qry = {
                filters:[ { key: 'fields.path', cmp: '=', value: path} ],
                types: pageContentType
            },
            content;

        grasshopper.core.content.query(qry).then(
                function(response){
                    if(response.total > 0){
                        content = response.results[0];
                        content.fields.navigation = nav;
                    }

                    next(content);
                },
                function(){
                    next();
                }
            )
            .catch(function(ex){
                console.log(ex);
                next();
            }).done();
    };
}

function render(res){
    return function(content){
        if(content){
            res.render('layout', { content: content } );
        }
        else {
            res.send(404, 'File not Found.');
        }
    }
}