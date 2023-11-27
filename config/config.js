const environments = {
    dev: {
        PORT: 3000,
        'envName': 'development',
        MONGODB_URI: 'mongodb://127.0.0.1:27017/test',
        HOST: 'localhost',
        ACCESS_TOKEN_SECRET: '123456789@!',
        ACCESS_TOKEN_LIFE: 3600
    },
    prod: {
        PORT: 5000,
        'envName': 'production'
    }
}

// Export the environment
const currentEnvironment = process.env.NODE_ENV == '' || process.env.NODE_ENV == undefined ? environments.dev : environments[process.env.NODE_ENV];


// console.log("*", currentEnvironment);

module.exports = currentEnvironment