import React from "react";

const Loader = () => {
  const loaderStyle = {
    "--s": "25px",
    "--g": "5px",
    width: "calc(2 * (1.353 * var(--s) + var(--g)))",
    aspectRatio: "1",
    background: `
      linear-gradient(#3c003c 0 0) left / 50% 100% no-repeat,
      conic-gradient(from -90deg at var(--s) calc(0.353 * var(--s)),
      #fff 135deg, #666 0 270deg, #aaa 0)
    `,
    backgroundBlendMode: "multiply",
    WebkitMask: `
      linear-gradient(to bottom right,
        #0000 calc(0.25 * var(--s)),
        #000 0 calc(100% - calc(0.25 * var(--s)) - 1.414 * var(--g)),
        #0000 0),
      conic-gradient(from -90deg at right var(--g) bottom var(--g),
        #000 90deg, #0000 0)
    `,
    mask: `
      linear-gradient(to bottom right,
        #0000 calc(0.25 * var(--s)),
        #000 0 calc(100% - calc(0.25 * var(--s)) - 1.414 * var(--g)),
        #0000 0),
      conic-gradient(from -90deg at right var(--g) bottom var(--g),
        #000 90deg, #0000 0)
    `,
    backgroundSize: "50% 50%",
    WebkitMaskSize: "50% 50%",
    maskSize: "50% 50%",
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
    animation: "l9 1.5s infinite",
  };

  const keyframes = `
    @keyframes l9 {
      0%, 12.5% { background-position: 0% 0%, 0 0 }
      12.6%, 37.5% { background-position: 100% 0%, 0 0 }
      37.6%, 62.5% { background-position: 100% 100%, 0 0 }
      62.6%, 87.5% { background-position: 0% 100%, 0 0 }
      87.6%, 100% { background-position: 0% 0%, 0 0 }
    }
  `;

  return (
    <div
      className="flex justify-center min-h-screen items-center h-64"
      style={{ textAlign: "center" }}
    >
      <style>{keyframes}</style>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
