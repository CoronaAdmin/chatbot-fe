import { fireRequest } from "./fireRequest";

export const login = (body) => {
    return fireRequest("login", [], body);
};
export const getCurrentUser = () => {
    return fireRequest("currentUser");
};
export const getSurvey = (id) => {
    return fireRequest("getSurvey", [id]);
};
export const postSurvey = (id, form) => {
    return fireRequest("postSurvey", [id], form);
};
export const postQuestions = (id, form) => {
    return fireRequest("addQuestions", [id], form);
};
export const fetchQuestions = (id) => {
    return fireRequest("fetchQuestions", [id]);
};
export const AddnewSurvey = (body) => {
    return fireRequest("addSurvey", [], body);
};
