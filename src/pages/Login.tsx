import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import React, { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

const Login = () => {
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const header = <div className="font-bold mb-3">Chọn 1 mật khẩu</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Đề xuất</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Ít nhất một chữ thường.</li>
        <li>Ít nhất một chữ hoa.</li>
        <li>Ít nhất một chữ số.</li>
        <li>Ít nhất phải có 6 ký tự.</li>
      </ul>
    </>
  );

  return (
    <div className="tw-min-h-screen">
      <div className="tw-absolute tw-left-[2.5%] md:tw-left-[15%] tw-top-[6%] tw-w-[95%] md:tw-w-[70%] tw-h-[88vh] tw-flex tw-border tw-shadow-md tw-rounded-lg tw-bg-white">
        {/* Ẩn phần tử bên trái khi dưới md */}
        <div className="tw-hidden tw-w-1/2 tw-bg-cover tw-bg-[url('/public/images/background-login.png')] md:tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-lg">
          <p className="tw-text-3xl tw-font-bold tw-text-white">
            Đại học Sài Gòn
          </p>
          <Avatar
            image="/public/images/sgu-logo.jpeg"
            shape="circle"
            className="tw-w-40 tw-h-40 tw-my-4"
          />
          <p className="tw-text-2xl tw-font-bold tw-text-white">
            Hỗ trợ giảng dạy cho giảng viên
          </p>
        </div>

        <div className="tw-w-full md:tw-w-1/2 tw-bg-[url('/public/images/background-login.png')] md:tw-bg-[url('')] md:tw-bg-white  tw-flex tw-items-center tw-justify-center tw-rounded-lg">
          <div className="tw-w-full tw-max-w-md tw-p-8 tw-rounded-lg ">
            <div className="tw-mb-10 tw-text-center">
              <Avatar
                image="/public/images/logo.png"
                shape="circle"
                className="tw-w-40 tw-h-40"
              />
              <h2 className="tw-text-3xl tw-text-white md:tw-text-title tw-font-semibold tw-text-center tw-mb-2">
                Đăng nhập
              </h2>
            </div>
            <form>
              <div className="tw-flex tw-flex-wrap tw-align-items-center tw-mb-8">
                <div className="p-inputgroup flex-1">
                  <FloatLabel>
                    <InputNumber
                      inputId="code"
                      invalid={code.length === 0}
                      useGrouping={false}
                      id="code"
                      name="code"
                      value={code ? +code : null}
                      onValueChange={(e) =>
                        setCode(
                          e.value !== undefined && e.value !== null
                            ? e.value.toString()
                            : ""
                        )
                      }
                    />
                    <label htmlFor="code">Mã số giảng viên</label>
                  </FloatLabel>
                </div>
              </div>
              <div className="tw-flex tw-flex-wrap tw-align-items-center tw-mb-8">
                <div className="p-inputgroup flex-1">
                  <FloatLabel>
                    <Password
                      invalid={password.length === 0}
                      id="password"
                      inputId="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      header={header}
                      footer={footer}
                      promptLabel="Chọn mật khẩu"
                      weakLabel="Quá đơn giản"
                      mediumLabel="Độ phức tạp trung bình"
                      strongLabel="Mật khẩu phức tạp"
                    />
                    <label htmlFor="password">Password</label>
                  </FloatLabel>
                </div>
              </div>

              <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <button
                  type="submit"
                  className="tw-bg-[#6366f1] hover:tw-bg-[#4f46e5] tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline tw-w-full"
                >
                  Đăng nhập
                </button>
              </div>

              <div className="tw-text-center">
                <a
                  href="#"
                  className="tw-text-sm tw-text-[#6366f1] hover:tw-text-[#4f46e5]"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
