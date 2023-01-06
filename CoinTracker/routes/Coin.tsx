import { useParams } from "react-router-dom";

interface Params {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<Params>();
  console.log(coinId);
  return <h1>Coin</h1>;
}

export default Coin;
