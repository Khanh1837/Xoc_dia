import ChieuImage from "../public/danh-muc-chieu-coi-in-hoa.jpg";
import DiaImage from "../public/dia.png";
import BatImage from "../public/bat.png";
import { useEffect, useState } from "react";

const ValueArray = [
  "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199568/rhn7rhikqsjfxytgppfj.jpg",
  "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/xsgtj4jmauytnf0l2oew.jpg",
  "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/k9qjy6utiqahndroiwyy.jpg",
  "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/u7eb23dz2yh0xxjzeioj.jpg",
  "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199568/rvbie7lsxisnaqdbsg1r.jpg",
  "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/wce6nac2l99bp2ihaqqt.jpg",
];

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [result, setResult] = useState<string[]>([]);

  const handlePlay = () => {
    const resultArr = [];

    for (let i = 0; i < 3; i++) {
      resultArr.push(ValueArray[Math.floor(Math.random() * 6)]);
    }

    setResult(resultArr);
  };

  useEffect(() => {
    handlePlay();
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="relative w-[1100px]">
        <img className="object-cover w-full" src={ChieuImage} alt="chieu-coi" />
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px]"
          src={DiaImage}
          alt=""
        />
        <img
          className={`${
            isOpen ? "top-32" : "top-1/2"
          } absolute left-1/2 -translate-x-[calc(50%-6px)] z-10 -translate-y-[calc(50%+13px)] w-[400px]`}
          src={BatImage}
          alt=""
        />
        <div className="flex gap-x-1 absolute top-1/2 left-1/2 -translate-x-[calc(20%+4px)] -translate-y-1/2 w-[600px]">
          <img src={result[0]} alt="" />
          <img src={result[1]} alt="" />
          <img src={result[2]} alt="" />
        </div>
        <div className="flex items-center justify-between absolute bottom-32 gap-x-10 left-1/2 -translate-x-1/2">
          <button
            className="bg-red-500 w-28 rounded-lg h-10 font-semibold text-white text-lg hover:bg-red-400"
            onClick={handlePlay}
          >
            Xóc
          </button>
          <button
            className="bg-green-500 w-28 rounded-lg h-10 font-semibold text-white text-lg hover:bg-green-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            Mở/Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
