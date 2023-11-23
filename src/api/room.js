import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function roomTransfer(room, success, fail) {
  await local.post(`/rooms/transfer`, room).then(success).catch(fail);
}

async function roomListByOption(option, success, fail) {
  await local.post(`/rooms/list/option`, option).then(success).catch(fail);
}

async function roomList(success, fail) {
  await local.get(`/rooms/list`).then(success).catch(fail);
}

async function getRoom(roomId, success, fail) {
  await local.get(`/rooms/${roomId}`).then(success).catch(fail);
}

async function getRankCity(success, fail) {
  await local.get(`/rank/city`).then(success).catch(fail);
}
async function getRankMale(success, fail) {
  await local.get(`/rank/male`).then(success).catch(fail);
}
async function getRankFemale(success, fail) {
  await local.get(`/rank/female`).then(success).catch(fail);
}


export { roomList, roomListByOption, roomTransfer, getRoom, getRankCity, getRankMale, getRankFemale };
