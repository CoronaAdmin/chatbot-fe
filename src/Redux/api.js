export default {
    login: {
        path: "/api/v1/account/login",
        method: "POST",
        noAuth: true,
    },
    currentUser: {
        path: "/api/v1/account/user",
        method: "GET",
        noAuth: false,
    },
    getSurvey: {
        path: "/survey/all",
        method: "GET",
        noAuth: false,
    },
    postSurvey: {
        path: "/survey",
        method: "POST",
        noAuth: true,
    },
};
