import React from "react";
import Header from "./component/header/header";
import Headline from "./component/headline/headline";

function App() {
  return (
    <div className="App">
      <Header />
      <section className="main">
        <Headline header="Posts" desc="Click button to render Posts!" />
      </section>
    </div>
  );
}

export default App;
