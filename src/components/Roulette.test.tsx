import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Roulette from "./Roulette";

afterEach(() => cleanup());

describe("描画", () => {
  test("初期表示", () => {
    render(<Roulette />);
    // screen.debug();
    expect(screen.getByText("候補者を入力してください。")).toBeTruthy();
    expect(screen.getByLabelText("候補者")).toBeTruthy();
    expect(screen.getByText("候補者リスト")).toBeTruthy();
    expect(screen.getByText("ルーレット")).toBeTruthy();
    expect(screen.getByText("チーム決め")).toBeTruthy();
    expect(screen.getByText("順番決め")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getByText("Go!")).toBeTruthy();
    expect(screen.getByText("Reset")).toBeTruthy();
  });
});
