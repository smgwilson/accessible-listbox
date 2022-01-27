import "./styles.css";
import Listbox from "./components/listbox";

const options = ["Chips", "Chocolate", "Pretzels", "Caramel", "Popcorn"];

export default function App() {
  return (
    <div className="App">
      <h1>Accessible Listbox</h1>
      <h2>
        Learn more about me on{" "}
        <a
          href="https://medium.com/p/301691c96465/edit"
          rel="noreferrer"
          target="_blank"
        >
          Medium
        </a>
        {""}!
      </h2>
      <h3>
        Try me using keyboard navigation or with your favorite screenreader
      </h3>
      <main>
        <Listbox dropDownText="Favorite Snack: " dropDownOptions={options} />
      </main>
    </div>
  );
}
