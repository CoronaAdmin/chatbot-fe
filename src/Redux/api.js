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
        path: "/api/v1/surveys/fetch_surveys/all",
        method: "GET",
        noAuth: false,
    },
    fetchQuestions: {
        path: "/api/v1/questions/fetch_questions",
        method: "GET",
        noAuth: false,
    },
    postSurvey: {
        path: "/api/v1/response/submit_response",
        method: "POST",
        noAuth: false,
    },
    addSurvey: {
        path: "/api/v1/surveys/add_surveys",
        method: "POST",
        noAuth: false,
    },
    deleteSurvey: {
        path: "/api/v1/surveys/delete_survey",
        method: "DELETE",
        noAuth: false,
    },
    addQuestions: {
        path: "/api/v1/questions/submit_question",
        method: "POST",
        noAuth: false,
    },
    deleteQuestions: {
        path: "/api/v1/questions/delete_question",
        method: "DELETE",
        noAuth: false,
    },
};
