import { useState, useEffect } from "react";

// component는 단지 jsx를 return 하는 function일 뿐이다.
function Practice() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => {
    setValue((prev) => prev + 1);
  };
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("i run all the time");
  const iRunOnlyOnce = () => {
    console.log("i run only once");
  };
  // 한 번만 실행
  useEffect(iRunOnlyOnce, []);
  // keyword가 변화될 때 실행
  useEffect(() => {
    console.log("i run when 'keyword' changes");
  }, [keyword]);
  // counter가 변화될 때만 실행
  useEffect(() => {
    console.log("i run when 'count' changes");
  }, [counter]);
  return (
    <div>
      <input
        onChange={onChange}
        type="text"
        placeholder="Search here..."
        value={keyword}
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default Practice;
