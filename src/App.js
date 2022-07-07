import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <section className="todoapp">
        <Header />
        <Content />
      </section>
      <Footer />
    </div>
  );
}

export default App;
