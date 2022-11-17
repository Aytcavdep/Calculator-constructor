import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type NumStr = number | string;
type CalcItemSliceType = {
  firstNumber: NumStr;
  secondNumber: NumStr;
  operator: string;
  result: string;
  isConstructorMode: boolean;
  displayValue: NumStr;
};
export const calcItemSlice = createSlice({
  name: "calc_item",
  initialState: <CalcItemSliceType>{
    firstNumber: 0,
    secondNumber: 0,
    operator: "",
    result: "",
    isConstructorMode: true,
    displayValue: 0
  },
  reducers: {
    changeConstructorMode(state, action: PayloadAction<boolean>) {
      state.isConstructorMode = !state.isConstructorMode;
      state.displayValue = 0;
    },
    pressButton(state, action: PayloadAction<NumStr>) {
      if (
        /\d/.test(String(action.payload)) &&
        (typeof state.displayValue === "string"
          ? state.displayValue.length < 22
          : typeof state.displayValue === "number")
      ) {
        if (state.displayValue === 0) {
          state.displayValue = action.payload;
        } else {
          state.displayValue += "" + action.payload;
        }
      }
      if (
        /\./.test(String(action.payload)) &&
        typeof state.displayValue === "string" &&
        !/\./.test(state.displayValue)
      ) {
        state.displayValue += "" + action.payload;
      }

      if (/\+|-|\*|\//.test(String(action.payload))) {
        state.firstNumber = state.displayValue;
        state.displayValue = 0;
        state.operator = String(action.payload);
      }

      if (/\=/.test(String(action.payload))) {
        state.secondNumber = state.displayValue;
        switch (state.operator) {
          case "-":
            state.displayValue = +(
              parseFloat(String(state.firstNumber)) -
              parseFloat(String(state.secondNumber))
            ).toFixed(22);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "+":
            state.displayValue = +(
              parseFloat(String(state.firstNumber)) +
              parseFloat(String(state.secondNumber))
            ).toFixed(22);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "*":
            state.displayValue = +(
              parseFloat(String(state.firstNumber)) *
              parseFloat(String(state.secondNumber))
            ).toFixed(22);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "/":
            if (+state.secondNumber !== 0) {
              state.displayValue = +(
                parseFloat(String(state.firstNumber)) /
                parseFloat(String(state.secondNumber))
              ).toFixed(22);
              state.firstNumber = 0;
              state.secondNumber = 0;
              state.operator = "";
            } else {
              state.displayValue = "Не определено";
              state.firstNumber = 0;
              state.secondNumber = 0;
              state.operator = "";
            }

            break;
          default:
            break;
        }
      }
    }
  }
});

export const { changeConstructorMode, pressButton } = calcItemSlice.actions;

export default calcItemSlice.reducer;
