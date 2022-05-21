import { createSlice } from "@reduxjs/toolkit";

export const calcItemSlice = createSlice({
  name: "calc_item",
  initialState: {
    secondNumber: "",
    operator: "",
    result: "",
    isConstructorMode: true,
    displayValue: 0,
  },
  reducers: {
    changeConstructorMode(state) {
      state.isConstructorMode = !state.isConstructorMode;
    },
    pressButton(state, action) {
      if (/\d/.test(action.payload)) {
        if (state.displayValue === 0) {
          // state.constructor[0].items[0].value = action.payload;
          state.displayValue = action.payload;
        } else {
          state.displayValue += "" + action.payload;
        }
      }
      if (/\./.test(action.payload) & !/\./.test(state.displayValue)) {
        state.displayValue += "" + action.payload;
      }

      if (/\+|-|\*|\//.test(action.payload)) {
        state.firstNumber = state.displayValue;
        state.displayValue = 0;
        state.operator = action.payload;
      }

      if (/\=/.test(action.payload)) {
        state.secondNumber = state.displayValue;
        switch (state.operator) {
          case "-":
            state.displayValue = +(
              parseFloat(state.firstNumber) - parseFloat(state.secondNumber)
            ).toFixed(10);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "+":
            state.displayValue = +(
              parseFloat(state.firstNumber) + parseFloat(state.secondNumber)
            ).toFixed(10);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "*":
            state.displayValue = +(
              parseFloat(state.firstNumber) * parseFloat(state.secondNumber)
            ).toFixed(10);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "/":
            if (+state.secondNumber !== 0) {
              state.displayValue = +(
                parseFloat(state.firstNumber) / parseFloat(state.secondNumber)
              ).toFixed(10);
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
    },
  },
});

export const { changeConstructorMode, pressButton } = calcItemSlice.actions;

export default calcItemSlice.reducer;
