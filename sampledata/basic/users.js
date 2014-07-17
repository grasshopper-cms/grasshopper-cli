module.exports = function(ObjectID) {
    'use strict';

    return [
        {
            _id: ObjectID('5246e73d56c02c0744000004'),
            role: 'admin',
            enabled: true,
            firstname: 'Test',
            lastname: 'User',
            identities: {
                basic: {
                    username: 'admin',
                    salt: '225384010328',
                    hash: '885f59a76ea44e1d264f9da45ca83574fbe55e3e7e6c51afe681730b45c7bb03'
                }
            },
            displayName : 'admin',
            linkedIdentities : ['basic'],
            email: 'email@email.com'
        }
    ];
};