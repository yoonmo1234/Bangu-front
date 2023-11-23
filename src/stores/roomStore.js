import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { roomList, roomListByOption, roomTransfer, getRoom } from "../api/room";
import { httpStatusCode } from "@/util/http-status";
export const useRoomStore = defineStore("roomStore", () => {
  const roomList = ref(null);
  const roomInfo = ref(null);
  const router = useRouter();

  const detailAvail = ref(false);

  const toggleDetailAvail = () => {
    detailAvail.value = true;
  };

  const registRoom = async (room) => {
    console.log("registRoom", JSON.stringify(room));
    await roomTransfer(
      JSON.stringify(room),
      (response) => {
        if (response.status === httpStatusCode.OK) {
          alert("등록이 완료되었습니다.");
          router.push({ name: "rent-room" });
        } else {
          alert("등록에 실패하셨습니다.");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const getRoomInfo = async (roomId) => {
    console.log("getRoomInfo", roomId);
    await getRoom(
      roomId,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log(response.data);
          roomInfo.value = response.data;
        } else {
          console.error("룸 정보 없음");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getRoomList = async () => {
    console.log("getRoomList");
    await roomList(
      (response) => {
        if (response.status === httpStatusCode.OK) {
          roomList.value = response.data;
        } else {
          console.error("룸 정보 없음");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return {
    toggleDetailAvail,
    getRoomList,
    getRoomInfo,
    registRoom,
    roomInfo,
    roomList,
    detailAvail,
  };
});
