export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";

    input.addEventListener("change", (event: any) => {
      const file = event.target.files[0];
      if (file) {
        resolve(file);
      } else {
        reject(new Error("No file selected"));
      }
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });
};
