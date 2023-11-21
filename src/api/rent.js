import { localAxios } from "../util/http-commons";

// axios 객체
const rentSearch = localAxios();

// 아파트 매매정보 데이터를 가져와 주는 ap보
function searchRentRoom(param, success, fail) {
    rentSearch.post("/rooms/list/option", JSON.stringify(param)).then(success).catch(fail);
}

export { searchRentRoom };