module.exports = function(ObjectID) {
    'use strict';

    return [
        {
            "label" : "Metadata",
            "fields" : [
                {
                    "defaultValue" : "",
                    "_id" : "description",
                    "validation" : [],
                    "type" : "textbox",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "Description"
                },
                {
                    "defaultValue" : "",
                    "_id" : "keywords",
                    "validation" : [],
                    "type" : "textbox",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "Keywords"
                }
            ],
            "_id" : ObjectID("53c8085054cbba0000ac2cb0"),
            "__v" : 0
        },
        {
            "__v" : 9,
            "_id" : ObjectID("53c807d654cbba0000ac2caf"),
            "description" : "Content commonly needed to create a web page.",
            "fields" : [
                {
                    "defaultValue" : "",
                    "_id" : "title",
                    "validation" : [],
                    "type" : "textbox",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "Title"
                },
                {
                    "defaultValue" : "",
                    "_id" : "path",
                    "type" : "textbox",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "Path"
                },
                {
                    "_id" : "metadata",
                    "validation" : [],
                    "type" : "embeddedtype",
                    "options" : "53c8085054cbba0000ac2cb0",
                    "min" : 1,
                    "max" : 1,
                    "label" : "Meta Data"
                },
                {
                    "helpText" : "Where on your site do you want this content to appear.",
                    "_id" : "bodycontent",
                    "validation" : [],
                    "type" : "richtext",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "Body Content"
                },
                {
                    "helpText" : "Where on your site do you want this content to appear.",
                    "_id" : "navigation",
                    "validation" : [],
                    "type" : "contentreference",
                    "options" : {
                        "defaultNode" : "53c8091354cbba0000ac2cb2",
                        "allowedTypes" : [
                            "53c808ee54cbba0000ac2cb1"
                        ]
                    },
                    "min" : 0,
                    "max" : 1000,
                    "label" : "Navigation"
                }
            ],
            "label" : "Page"
        },{
            "__v" : 4,
            "_id" : ObjectID("53c808ee54cbba0000ac2cb1"),
            "fields" : [
                {
                    "defaultValue" : "",
                    "_id" : "title",
                    "validation" : [],
                    "type" : "textbox",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "Title"
                },
                {
                    "defaultValue" : "",
                    "_id" : "href",
                    "validation" : [],
                    "type" : "textbox",
                    "options" : false,
                    "min" : 1,
                    "max" : 1,
                    "label" : "href"
                }
            ],
            "label" : "Navigation Item"
        }
    ];
};