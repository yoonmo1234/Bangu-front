import { localAxios } from "@/util/http-commons";
const local = localAxios();

export async function sendMail(info, success, fail) {
  await local.post(`/mail`, info).then(success).catch(fail);
}
