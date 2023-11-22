import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { roomList, roomListByOption, roomTransfer, getRoom } from "../api/room";

export const useRoomStore = defineStore("roomStore", () => {
  const roomList = ref(null);
  const roomInfo = ref(null);
  const router = useRouter();
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
  return { getRoomList, getRoomInfo, registRoom, roomInfo, roomList };
});
