export const environment = {
    production: false,
    isLocal: false,
    apiUrl: "https://localhost:7299",
    openaiUrl: 'https://api.openai.com/v1/chat/completions',
    openaiApiKey: 'U2FsdGVkX19HKVilLAuZhE+YJ6aXwTJvCi/KxBDiXDee/t07crpL6bCEYNd1Rg6YpLS81nJhyTODWbcC20c9mc96VQ31AsE5cUTEZ7vjCTnZlWOWuy72wv7+S5se3IkZ/rjvMDHXmqCY5plb0DcWDHeqItv06lRI3sruVJkaiC/4zr8wQLMRyDP6Yi6A/GBjRh2CReWGzZDoZ6S6TjZCshVUk3xM77bpWkgewRDWQ5A=',
    geminisApiKey: 'U2FsdGVkX19qJ0kyDJIn6hJmu6geyWpQIrHlEFmX72n8xA86eqwMBtrk0PSE2sQZvUz0tTCIJqnEUcOUDsUCfg==',
    path: {
        cities: '/api/Cities',
        countries: '/api/Countries',
        disorders: '/api/Disorders',
        documentsTypes: '/api/DocumentTypes',
        psychologists: '/api/Psychologists',
        states: '/api/States',
        therapies: '/api/Terapies',
        users: '/api/Users',
        accounts: '/api/Accounts',
        regiter: '/api/accounts/CreateUser',
        login: '/api/accounts/Login',
        recoverPassword: '/api/accounts/recoverPassword',
        resources: '/api/Resources',
        resourcesDisorder: '/api/ResourcesDisorder'
    }
};
