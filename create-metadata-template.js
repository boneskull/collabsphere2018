'use strict';

/**
 * This file creats a metadata template containing categories from 
 * Watson NLU
 */

const APP_USER_ID = 3832275179;

const BoxSDK = require('box-node-sdk');
const jsonConfig = require('./47119042_3efk67f6_config.json');
const categories = require('./categories.json');
const sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

const client = sdk.getAppAuthClient('enterprise');

const cats = Array.from(new Set(categories.map(cat => [
                cat['LEVEL 1'],
                cat['LEVEL 2'],
                cat['LEVEL 3'],
                cat['LEVEL 4']
            ].filter(Boolean)
            .join('/'))
        .filter(Boolean)))
    .sort()
    .map(name => ({
        displayName: name,
        key: `/${name}`
    }));

client.metadata.createTemplate('Categories', [{
        type: 'multiSelect',
        key: 'category',
        displayName: 'Category',
        options: cats
    }], {
        hidden: false,
        templateKey: 'cats'
    })
    .then(res => {
        console.log(`${res.displayName} OK!`);
    }).catch(err => {
        console.log(err);
    });
