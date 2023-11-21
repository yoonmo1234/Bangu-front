import { sidoGugunDongAxios } from "../util/http-commons";

// axios 객체
const sidoGugunDong = sidoGugunDongAxios();

// 시도, 구군, 법정동 데이터를 가져와 주는 api
function getAddress(param, success, fail) {
  sidoGugunDong.get("", { params: param }).then(success).catch(fail);
}

export { getAddress };
