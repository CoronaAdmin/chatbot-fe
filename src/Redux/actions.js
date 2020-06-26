import { fireRequest } from "./fireRequest";

export const login = (body) => {
    return fireRequest("login", [], body);
};
export const getCurrentUser = () => {
    return fireRequest("currentUser");
};
export const getSurvey = () => {
    return fireRequest("getSurvey");
};
export const postSurvey = (id, form) => {
    console.log(form);
    return fireRequest("postSurvey", [id], form, "", true);
};
export const fetchQuestions = () => {
    return fireRequest("fetchQuestions");
};
