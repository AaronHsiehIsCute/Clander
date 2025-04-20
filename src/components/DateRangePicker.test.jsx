import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateRangePicker from "./DateRangePicker";

describe("DateRangePicker", () => {
  test("should allow selecting a start date", () => {
    const { container } = render(<DateRangePicker />);
    const allDays = container.querySelectorAll(".day");

    const day5 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "5日" && !el.className.includes("non-current")
    );
    fireEvent.click(day5);

    expect(day5).toHaveClass("selected");
  });

  test("should allow selecting an end date after start date", () => {
    const { container } = render(<DateRangePicker />);
    const allDays = container.querySelectorAll(".day");

    const day5 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "5日" && !el.className.includes("non-current")
    );
    const day10 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "10日" &&
        !el.className.includes("non-current")
    );

    fireEvent.click(day5);
    fireEvent.click(day10);

    expect(day5).toHaveClass("selected");
    expect(day10).toHaveClass("selected");
  });

  test("should reset start date if clicked day is earlier than current start", () => {
    const { container } = render(<DateRangePicker />);
    const allDays = container.querySelectorAll(".day");

    const day15 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "15日" &&
        !el.className.includes("non-current")
    );
    const day5 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "5日" && !el.className.includes("non-current")
    );

    fireEvent.click(day15);
    fireEvent.click(day5);

    expect(day5).toHaveClass("selected");
    expect(day15).not.toHaveClass("selected");
  });

  test("should not allow selecting non-current month day", () => {
    const { container } = render(<DateRangePicker />);
    const nonCurrentDay = container.querySelector(".day.non-current");
    fireEvent.click(nonCurrentDay);

    expect(nonCurrentDay).not.toHaveClass("selected");
  });

  test("should call onSelectRange when dates are selected", () => {
    const mockSelect = jest.fn();
    const { container } = render(
      <DateRangePicker onSelectRange={mockSelect} />
    );
    const allDays = container.querySelectorAll(".day");

    const day5 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "5日" && !el.className.includes("non-current")
    );
    const day10 = Array.from(allDays).find(
      (el) =>
        el.textContent.trim() === "10日" &&
        !el.className.includes("non-current")
    );

    fireEvent.click(day5);
    fireEvent.click(day10);

    expect(mockSelect).toHaveBeenCalledTimes(2);
    expect(mockSelect).toHaveBeenLastCalledWith(
      expect.objectContaining({
        start: expect.any(Date),
        end: expect.any(Date),
      })
    );
  });
});
