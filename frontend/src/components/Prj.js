import axios from "axios";
import React, { useEffect, useState } from "react";

const Prj = ({ v }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const f = async () => {
      const res = await axios.get("http://localhost:8080/api/products/3");
      console.log(res.data);
      setData(res.data);
    };

    f();
  }, []);

  return (
    <div>
      Prj,{v}
      {data.pname}
    </div>
  );
};
//product 전체 목록 출력

export default Prj;
