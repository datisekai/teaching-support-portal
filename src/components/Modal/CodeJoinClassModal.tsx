import { InputOtp } from "primereact/inputotp";
import React, { InputHTMLAttributes, useState } from "react";
import { useModalStore } from "../../stores";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  events: React.HTMLAttributes<HTMLInputElement>;
  props: React.HTMLAttributes<HTMLInputElement>;
}

const CodeJoinClassModal = () => {
  const { content } = useModalStore();
  const customInput = ({ events, props }: CustomInputProps) => (
    <input {...events} {...props} type="text" className="custom-otp-input" />
  );

  return (
    <div>
      <div className="flex justify-content-center">
        <style scoped>
          {`
                    .custom-otp-input {
                        width: 40px;
                        font-size: 36px;
                        border: 0 none;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        background: transparent;
                        border-bottom: 2px solid var(--surface-500);
                    }

                    .custom-otp-input:focus {
                        outline: 0 none;
                        border-bottom-color: var(--primary-color);
                    }
                `}
        </style>
        <InputOtp
          value={content?.code}
          disabled={true}
          inputTemplate={customInput as any}
          length={6}
        />
      </div>
    </div>
  );
};

export default CodeJoinClassModal;
