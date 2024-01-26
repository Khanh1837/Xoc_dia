import ChieuImage from "../public/danh-muc-chieu-coi-in-hoa.jpg";
import DiaImage from "../public/dia.png";
import BatImage from "../public/bat.png";
import { useEffect, useState } from "react";

type ItemType = {
  id: number;
  point: number;
  image: string;
};

const ValueArray: ItemType[] = [
  {
    id: 0,
    point: 0,
    image:
      "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199568/rhn7rhikqsjfxytgppfj.jpg",
  },
  {
    id: 1,
    point: 0,
    image:
      "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/xsgtj4jmauytnf0l2oew.jpg",
  },
  {
    id: 2,
    point: 0,
    image:
      "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/k9qjy6utiqahndroiwyy.jpg",
  },
  {
    id: 3,
    point: 0,
    image:
      "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/u7eb23dz2yh0xxjzeioj.jpg",
  },
  {
    id: 4,
    point: 0,
    image:
      "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199568/rvbie7lsxisnaqdbsg1r.jpg",
  },
  {
    id: 5,
    point: 0,
    image:
      "https://res.cloudinary.com/dcb5n0grf/image/upload/v1706199569/wce6nac2l99bp2ihaqqt.jpg",
  },
];

const ValueClone = ValueArray;

function App() {
  const [items, setItems] = useState<ItemType[]>(ValueClone);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [point, setPoint] = useState<number>(100);
  const [results, setResults] = useState<ItemType[]>([]);

  const handlePlay = () => {
    const resultArr = [];

    for (let i = 0; i < 3; i++) {
      resultArr.push(ValueClone[Math.floor(Math.random() * 6)]);
    }

    setResults(resultArr);
    setIsPlay(true);
  };

  const handleOpen = () => {
    let receivePoint = 0;
    setIsOpen(true);

    for (const item of items) {
      for (const result of results) {
        if (item.id === result.id && item.point > 0) {
          receivePoint += item.point;
        }
      }
    }
    setPoint((prev) => prev + receivePoint);

    setItems((prev) =>
      prev.map((item) => {
        item.point = 0;
        return item;
      })
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPlay(false);
  };

  const handleAddPoint = (id: number) => {
    if (point === 0) {
      return;
    }

    const newItems = items.map((item) => {
      if (item.id === id) {
        setPoint((prev) => (prev -= 10));
        item.point += 10;
      }
      return item;
    });

    setItems(newItems);
  };

  const handleRemovePoint = (id: number) => {
    const newItems = items.map((item) => {
      if (item.id === id && item.point >= 10) {
        setPoint((prev) => (prev += 10));
        item.point -= 10;
      }
      return item;
    });

    setItems(newItems);
  };

  useEffect(() => {
    handlePlay();
  }, []);

  return (
    <div className="w-full flex justify-between items-center h-screen">
      <div className="text-3xl font-bold w-40 h-screen pl-8">Điểm: {point}</div>
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
          <img src={results[0]?.image} alt="" />
          <img src={results[1]?.image} alt="" />
          <img src={results[2]?.image} alt="" />
        </div>
        <div className="flex items-center justify-between absolute bottom-32 gap-x-10 left-1/2 -translate-x-1/2">
          <button
            disabled={isOpen}
            className={`${
              isOpen ? "bg-red-400" : "hover:bg-red-400 bg-red-500"
            }  w-28 rounded-lg h-10 font-semibold text-white text-lg`}
            onClick={handlePlay}
          >
            Xóc
          </button>
          {isOpen ? (
            <button
              className="bg-green-500 w-28 rounded-lg h-10 font-semibold text-white text-lg hover:bg-green-400"
              onClick={handleClose}
            >
              Đóng
            </button>
          ) : (
            <button
              disabled={!isPlay}
              className={`${
                isPlay ? "bg-green-500 hover:bg-green-400" : "bg-green-400"
              } w-28 rounded-lg h-10 font-semibold text-white text-lg`}
              onClick={handleOpen}
            >
              Mở
            </button>
          )}
        </div>
      </div>
      <span className="space-y-5">
        {items.map((item) => (
          <div key={item.id} className="flex gap-x-5 items-center">
            <div>
              <button
                className="bg-yellow-300 h-8 px-3 rounded-md w-28 block mb-2"
                onClick={() => handleAddPoint(item.id)}
              >
                Thêm 10đ
              </button>
              <button
                className="bg-blue-300 h-8 px-3 rounded-md w-28 block"
                onClick={() => handleRemovePoint(item.id)}
              >
                Bỏ 10đ
              </button>
            </div>
            <p className="text-2xl font-semibold w-10 text-center">
              {item.point}
            </p>
            <img src={item.image} alt="" />
          </div>
        ))}
      </span>
    </div>
  );
}

export default App;
