module.exports = function(ObjectID) {
    'use strict';

    return [
        {
            "fields" : {
                "navigation" : [
                    "53c809f754cbba0000ac2cb4"
                ],
                "bodycontent" : "<p>This is my test content</p>\n",
                "metadata" : {
                    "keywords" : "",
                    "description" : ""
                },
                "path" : "/",
                "title" : "Home"
            },
            "_id" : ObjectID("53c85bb59c38840000cae250"),
            "meta" : {
                "node" : ObjectID("53c8091d54cbba0000ac2cb3"),
                "type" : ObjectID("53c807d654cbba0000ac2caf"),
                "labelfield" : "title",
                "typelabel" : "Page",
                "created" : new Date("2014-07-17T23:26:45.536Z"),
                "lastmodified" : new Date("2014-07-17T23:26:45.535Z")
            },
            "__v" : 0
        },{
            "fields" : {
                "navigation" : [],
                "bodycontent" : "<p>This is my 2nd page</p>\n",
                "metadata" : {
                    "keywords" : "",
                    "description" : ""
                },
                "path" : "/page2",
                "title" : "Page 2"
            },
            "_id" : ObjectID("53c95da12a987b0000dddd28"),
            "meta" : {
                "node" : ObjectID("53c8091d54cbba0000ac2cb3"),
                "type" : ObjectID("53c807d654cbba0000ac2caf"),
                "labelfield" : "title",
                "typelabel" : "Page",
                "created" : new Date("2014-07-18T17:47:13.141Z"),
                "lastmodified" : new Date("2014-07-18T17:47:13.140Z")
            },
            "__v" : 0
        },{
            "__v" : 0,
            "_id" : ObjectID("53c809f754cbba0000ac2cb4"),
            "fields" : {
                "href" : "/",
                "parent" : "",
                "slug" : "",
                "title" : "Home"
            },
            "meta" : {
                "node" : ObjectID("53c8091354cbba0000ac2cb2"),
                "type" : ObjectID("53c808ee54cbba0000ac2cb1"),
                "labelfield" : "title",
                "typelabel" : "Navigation Item",
                "created" : new Date("2014-07-17T17:37:59.920Z"),
                "lastmodified" : new Date("2014-07-18T17:49:04.768Z")
            }
        },{
            "__v" : 0,
            "_id" : ObjectID("53c95d882a987b0000dddd27"),
            "fields" : {
                "href" : "/page2",
                "parent" : "",
                "title" : "Page 2"
            },
            "meta" : {
                "node" : ObjectID("53c8091354cbba0000ac2cb2"),
                "type" : ObjectID("53c808ee54cbba0000ac2cb1"),
                "labelfield" : "title",
                "typelabel" : "Navigation Item",
                "created" : new Date("2014-07-18T17:46:48.233Z"),
                "lastmodified" : new Date("2014-07-18T17:49:10.479Z")
            }
        }
    ];
};