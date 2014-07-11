var should = require('chai').should(),
    path = require('path'),
    Git = require('git').Git;

describe('Test the project validating routines', function(){
    'use strict';

    var validate = require('../lib/validate');

    it('Check and see if the user has git installed', function(done) {
        validate.hasGit().then(
            function(success){
                success.should.equal(true);
            },
            function(err){
                err.should.not.exist;
            }
        ).done(done);
    });

    it('Check and see if package.json file exists', function(done) {
        validate.hasPackageFile('.').then(
            function(success){
                success.should.equal(true);
            },
            function(err){
                err.should.not.exist;
            }
        ).done(done);
    });

    it('Should fail because package file can\'t be found.', function(done) {
        validate.hasPackageFile('doesnt exist').then(
            function(success){
                success.should.not.exist;
            },
            function(err){
                err.message.should.equal('Can\'t find package.json file (doesnt exist/package.json). Please run the npm init command in your project home.');
            }
        ).done(done);
    });
});