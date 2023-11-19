import axios from "axios";

const { 
  VITE_VUE_API_URL,
  VITE_SIDO_GUGUN_DONG_URL ,
  VITE_APART_DEAL_URL,
} = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// public data vue api axios instance
function publicDataAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// 시도구군동 정보 얻어오는 axios 객체
function sidoGugunDongAxios() {
  const instance = axios.create({
    baseURL: VITE_SIDO_GUGUN_DONG_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// 아파트 매매 정보 얻어오는 axios 객체
function apartDealAxios() {
  const instance = axios.create({
    baseURL: VITE_APART_DEAL_URL,
    headers: {
      // "Content-Type": "application/json;charset=utf-8",
      "Content-Type": "application/xml;charset=utf-8",
    },
  });
  return instance;
}

export { localAxios, publicDataAxios, sidoGugunDongAxios, apartDealAxios };
