const config = {
    local: {
        DB: {
            HOST: "127.0.0.1",
            PORT: "27017",
            DATABASE: "contactus",
            UserName: "",
            Password: ""
        },
        email: {
            username: "flmebird@gmail.com",
            password: "ikrx rdzf bjlk fhlk"
        },

        PORTNO: 8000,

    },

    staging: {
        DB: {
            HOST: "0.0.0.0",
            PORT: "27017",
            DATABASE: "contactus",
            MONGOOSE: {
                useUndifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "manishpatra254",
            Password: "VqbsmbCmVW0wev1f"
        },
        email: {
            username: "flmebird@gmail.com",
            password: "ikrx rdzf bjlk fhlk"
        },

        PORTNO: 8000,

    },
}
export const get = function get(env) {
    return config[env];
}