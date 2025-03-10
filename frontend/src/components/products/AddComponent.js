import React, { useRef, useState } from "react";
import { postAdd } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

//249p
const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};
const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef(); // tag 제어할때
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null); //p260
  const { moveToList } = useCustomMove(); // p263

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };
  const handleClickAdd = (e) => {
    //p252p
    const files = uploadRef.current.files;
    console.log("files:", files);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //다른 데이터
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    console.log(formData);
    setFetching(true); //추가  p257
    postAdd(formData).then((i) => {
      console.log(i);
      setFetching(false);
      setResult(i.result);
    });
  };
  const closeModal = () => {
    console.log("클로우즈 버튼이 눌렸어요");
    setResult(null);
    moveToList({ page: 1 }); //모달창이 닫히면(데이터를 추가하면  list 로 ) 이동 p263
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={"제품 추가 결과"}
          content={`${result} 번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제품명</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type={"text"}
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상세설명</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pdesc"
            type={"text"}
            value={product.pdesc}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full font-bold">파일</div>
        <input
          className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          type={"file"}
          multiple={true}
          ref={uploadRef}
        ></input>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            onClick={handleClickAdd}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
