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
    return fireRequest("postSurvey", [id], form);
};
export const fetchQuestions = () => {
    return fireRequest("fetchQuestions");
};
export const AddnewSurvey = (body) => {
    return fireRequest("addSurvey", [], body);
};
