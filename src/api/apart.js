import { apartDealAxios } from "../util/http-commons";

// axios 객체
const apartDeal = apartDealAxios();

// 아파트 매매정보 데이터를 가져와 주는 ap보
function getApartDealInfo(param, success, fail) {
    apartDeal.get("", {params:param}).then(success).catch(fail);
}

export { getApartDealInfo };