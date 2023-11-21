import { sidoGugunDongAxios } from "../util/http-commons";

// axios 객체
const sidoGugunDong = sidoGugunDongAxios();

let basicParam = {
    regcode_pattern:"",
    is_ignore_zero:true,
}
// 대한민국 시도 데이터를 가져와주는 api
function listSido(success, fail) {
    let param = {
        regcode_pattern:"*00000000",
        is_ignore_zero:true,
    }
    sidoGugunDong.get("", {params:param}).then(success).catch(fail);
}
// 대한민국 구군 데이터를 가져와주는 api
function listGugun(param, success, fail) {
    sidoGugunDong.get("", {params:param}).then(success).catch(fail);
}

export { listSido, listGugun, };