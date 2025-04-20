import "./styles.css";
import DateRangePicker from "./components/DateRangePicker";

export default function App() {
  const handleRangeSelect = ({ start, end }) => {
    console.log("日期範圍:", start, "到", end);
  };

  return (
    <div className="App">
      <h1>日期範圍選擇器</h1>
      <DateRangePicker
        initialYear={2025}
        initialMonth={3}
        onSelectRange={handleRangeSelect}
      />
    </div>
  );
}
