import dayjs from "dayjs";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { SocketMessage } from "../../constants";
import { AttendeeSchemas } from "../../dataTable/roomTable";
import { useToast } from "../../hooks/useToast";
import { useAttendanceStore } from "../../stores";
import { useModalStore } from "../../stores/modalStore";
import { useSocketStore } from "../../stores/socketStore";
import { IRoomState } from "../../types/attendance";
import { ISocketResponse } from "../../types/socket";
import MyTable from "../UI/MyTable";

const AttendanceModal = () => {
  const { content, modalName } = useModalStore();
  const { socket } = useSocketStore();
  const { showToast } = useToast();
  const { updateStatus } = useAttendanceStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [roomState, setRoomState] = useState<IRoomState>({} as IRoomState);

  useEffect(() => {
    socket?.emit(
      SocketMessage.JOIN_OR_CREATE,
      {
        expirationTime: content.expirationTime || 3000,
        classId: content.class.id,
        secretKey: content.secretKey,
        id: content.id,
        attendees: content.attendees.map((item: any) => ({
          code: item.user.code,
          name: item.user.name,
          time: new Date(item.createdAt).getTime(),
        })),
      },
      (response: ISocketResponse) => {
        const { message, success, data } = response;
        setRoomState(data);
        if (!success) {
          showToast({
            summary: "Thông báo",
            message,
            severity: "danger",
          });
        }
      }
    );

    socket?.on(SocketMessage.ROOM_STATUS_UPDATED, (data: IRoomState) => {
      setRoomState(data);
      updateStatus(data.id, data.isOpen);
    });

    socket?.on(SocketMessage.NEW_QRCODE, (data: IRoomState) => {
      setRoomState(data);
    });

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      socket?.off(SocketMessage.ROOM_STATUS_UPDATED);
      socket?.off(SocketMessage.NEW_QRCODE);

      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleUpdateStatus = (isOpen: boolean) => {
    socket?.emit(
      SocketMessage.UPDATE_STATUS_ROOM,
      { ...roomState, isOpen },
      (response: ISocketResponse) => {
        const { success, message } = response;
        showToast({
          summary: "Thông báo",
          message,
          severity: success ? "success" : "danger",
        });
      }
    );
  };

  const enterFullscreen = () => {
    const elem: any = document.querySelector(`.modal-${modalName}`);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if ((document as any).exitFullscreen) {
      (document as any).exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      // Chrome, Safari and Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      // IE/Edge
      (document as any).msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  return (
    <div className="tw-flex  tw-gap-2">
      <div className={`tw-w-[50%]`}>
        <TabView>
          <TabPanel header="Thông tin">
            <div className="tw-space-y-1">
              <div>
                Tiêu đề:{" "}
                <span className="tw-font-semibold">{content.title}</span>
              </div>
              <div>
                Ngày điểm danh:{" "}
                <span className="tw-font-semibold">
                  {dayjs(content.time).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
              <div>
                Môn học:{" "}
                <span className="tw-font-semibold">
                  {content.class.major.name}
                </span>
              </div>
              <div>
                Lớp học:{" "}
                <span className="tw-font-semibold">{content.class.name}</span>
              </div>
              <div>
                Giảng viên:{" "}
                <span className="tw-font-semibold">
                  {content.class.teachers
                    .map((item: any) => item.name)
                    .join(",")}
                </span>
              </div>
              <div>
                Trạng thái:{" "}
                <Tag
                  severity={roomState.isOpen ? "info" : "warning"}
                  value={
                    roomState.isOpen ? "Đang điểm danh" : "Không hoạt động"
                  }
                ></Tag>
              </div>
            </div>
            <div className="tw-flex  tw-flex-wrap tw-items-center tw-gap-2 tw-mt-4">
              <Button
                onClick={() => handleUpdateStatus(true)}
                disabled={roomState.isOpen}
                severity="info"
                label="Bắt đầu"
              ></Button>
              <Button
                onClick={() => handleUpdateStatus(false)}
                disabled={!roomState.isOpen}
                severity="danger"
                label="Huỷ"
              ></Button>
            </div>
          </TabPanel>
          <TabPanel header="Danh sách">
            <MyTable
              schemas={AttendeeSchemas}
              data={roomState.attendees || []}
              clientPagination={true}
              perPage={10}
            />
          </TabPanel>
        </TabView>
      </div>
      <div className="tw-aspect-[1/1] relative p-4  tw-flex-1 tw-border tw-rounded-lg tw-flex tw-justify-center tw-items-center">
        {roomState.isOpen && roomState.qrCode && (
          <div className="tw-w-full">
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={roomState.qrCode}
            />
          </div>
        )}
        {!roomState.isOpen && !roomState.qrCode && (
          <div className="tw-font-semibold">
            Để điểm danh, hãy click bắt đầu
          </div>
        )}
        {!roomState.isOpen && roomState.qrCode && (
          <div className="tw-font-semibold">
            Thời gian điểm danh đã kết thúc
          </div>
        )}
      </div>

      <div className="tw-absolute tw-bottom-2 tw-left-2">
        <Button
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          text
          size="small"
          icon={
            isFullscreen
              ? "pi pi-arrow-down-left-and-arrow-up-right-to-center"
              : "pi pi-arrow-up-right-and-arrow-down-left-from-center"
          }
        ></Button>
      </div>
    </div>
  );
};

export default AttendanceModal;
