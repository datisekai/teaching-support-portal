import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { InputSwitch } from "primereact/inputswitch";

type CodeType = {
  html: string;
  css: string;
  javascript: string;
};

type LiveModeType = {
  htmlCss: boolean;
  js: boolean;
};

const tabs = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Javascript", value: "javascript" },
];

type Props = {
  htmlInitialValue?: string;
  cssInitialValue?: string;
  jsInitialValue?: string;
  onChange?: (value: CodeType) => void;
  heightItem?: string;
  options?: any;
};

const MyHtmlCodeEditor: React.FC<Props> = ({
  cssInitialValue = "",
  htmlInitialValue = "",
  jsInitialValue = "",
  onChange,
  heightItem = "20vh",
  options = {},
}) => {
  const iframeRef = useRef(null);
  const [code, setCode] = useState<CodeType>({
    html: htmlInitialValue,
    css: cssInitialValue,
    javascript: jsInitialValue,
  });
  const [live, setLive] = useState<LiveModeType>({ htmlCss: false, js: false });
  const [iframeLogs, setIframeLogs] = useState<any[]>([]);

  const handleRunCode = (isRunJs: boolean = false) => {
    if (iframeRef.current && code) {
      const iframe: any = iframeRef.current;

      if (iframe?.contentDocument?.body) {
        iframe.contentDocument.body.innerHTML = `
            ${code.html}
            <style>${code.css}</style>
          `;
      }

      if (isRunJs) {
        try {
          iframe.contentWindow.eval(code.javascript);
        } catch (error: any) {
          setIframeLogs((prevLogs) => [...prevLogs, `Error: ${error.message}`]);
        }
      }
    }
  };

  useEffect(() => {
    handleRunCode(live.js);
  }, [code, live]);

  useEffect(() => {
    if (onChange && typeof onChange === "function") {
      onChange(code);
    }
  }, [code]);

  useEffect(() => {
    const iframe: any = iframeRef.current;

    const handleIframeLoad = () => {
      const iframeWindow: any = iframe.contentWindow;

      if (iframeWindow) {
        const originalConsoleLog = iframeWindow.console.log;

        iframeWindow.console.log = (...args: any) => {
          const logMessage = args
            .map((arg: any) =>
              typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
            )
            .join(" ");

          setIframeLogs((prevLogs) => [...prevLogs, logMessage]);

          originalConsoleLog.apply(iframeWindow.console, args);
        };

        iframeWindow.console.error = (...args: any) => {
          const errorMessage = args
            .map((arg: any) =>
              typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
            )
            .join(" ");

          setIframeLogs((prevLogs) => [...prevLogs, `Error: ${errorMessage}`]);
        };
      }
    };

    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
      iframe.srcdoc = "<html><body></body></html>";
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);

  return (
    <div>
      <div className=" tw-gap-4">
        <div className="tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-x-2 tw-items-center ">
          {tabs.map((tab) => (
            <div key={tab.value} className="w-full">
              <div className="bg-primary tw-px-4 tw-py-2 tw-rounded-tl tw-rounded-tr tw-font-bold">
                {tab.label}
              </div>
              <div className="tw-p-4 tw-bg-[#1E1E1E]">
                <Editor
                  height={heightItem}
                  theme="vs-dark"
                  options={options}
                  defaultLanguage={tab.value}
                  value={
                    code?.[tab.value as "html" | "css" | "javascript"] || ""
                  }
                  onChange={(value) => setCode({ ...code, [tab.value]: value })}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="tw-flex-1 tw-border tw-flex tw-flex-col tw-mt-2">
          <div className="tw-bg-[#1e1e1e] tw-text-white tw-flex tw-justify-between tw-px-4 tw-py-2 tw-rounded-tl tw-rounded-tr">
            <div
              onClick={() => {
                setIframeLogs([]);
                handleRunCode(true);
              }}
              className="tw-cursor-pointer tw-flex tw-items-center tw-font-bold"
            >
              <div>
                <div>Output</div>
              </div>
              <i className="pi pi-play tw-ml-2"></i>
            </div>
            <div className="tw-flex tw-items-center tw-gap-4">
              <div className="tw-flex tw-items-center tw-gap-2">
                <div className="tw-font-bold">Live JS</div>
                <InputSwitch
                  checked={live.js}
                  onChange={(e) => setLive({ ...live, js: e.value })}
                />
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <div className="tw-font-bold">Live HTML</div>
                <InputSwitch
                  checked={live.htmlCss}
                  onChange={(e) => setLive({ ...live, htmlCss: e.value })}
                />
              </div>
            </div>
          </div>
          <iframe
            ref={iframeRef}
            className="tw-flex-1 tw-select-none tw-cursor-not-allowed tw-min-h-[500px] tw-bg-white"
          ></iframe>

          <div className="tw-mt-4">
            <div className="bg-primary tw-px-4 tw-py-2 tw-rounded-tl tw-rounded-tr tw-flex tw-items-center">
              <div className="tw-font-bold">Console</div>
              <i
                onClick={() => setIframeLogs([])}
                className="tw-cursor-pointer pi pi-ban tw-ml-2"
              ></i>
            </div>
            <div
              className="tw-p-4 tw-bg-[#1E1E1E] tw-text-white tw-overflow-y-auto"
              style={{ height: heightItem, maxHeight: heightItem }}
            >
              {iframeLogs.length > 0 ? (
                iframeLogs.map((log, index) => (
                  <div
                    key={index}
                    style={{ whiteSpace: "pre-wrap", marginBottom: "5px" }}
                  >
                    {log}
                  </div>
                ))
              ) : (
                <p>No logs yet...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHtmlCodeEditor;
