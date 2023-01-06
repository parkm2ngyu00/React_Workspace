import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./routes/Details";
import Home from "./routes/Home";

// Switch는 Route를 찾는데, Route는 URL을 의미한다
// Route를 찾으면, component를 rendering한다
// Link는 새로고침 없이 유저를 다른 페이지로 이동시켜주는 컴포넌트
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
