import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type NumStr = number | string;
type CalcLogicSliceType = {
  firstNumber: NumStr;
  secondNumber: NumStr;
  operator: string;
  result: string;
  isConstructorMode: boolean;
  displayValue: NumStr;
};
export const calcLogicSlice = createSlice({
  name: "calc_item",
  initialState: <CalcLogicSliceType>{
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
          ? state.displayValue.length < 16
          : typeof state.displayValue === "number")
      ) {
        if (state.displayValue === 0) {
          state.displayValue = String(action.payload);
        } else {
          state.displayValue === "Не определено"
            ? (state.displayValue = "" + action.payload)
            : state.operator !== "" && state.firstNumber === 0
            ? ((state.firstNumber = state.displayValue),
              (state.displayValue = "" + action.payload))
            : (state.displayValue += "" + action.payload);
        }
      }
      if (
        (/\./.test(String(action.payload)) &&
          typeof state.displayValue === "string" &&
          !/\./.test(state.displayValue)) ||
        (/\./.test(String(action.payload)) && state.displayValue === 0)
      ) {
        state.displayValue === "Не определено"
          ? (state.displayValue = "" + 0 + action.payload)
          : (state.displayValue += "" + action.payload);
      }

      if (/\+|-|\*|\//.test(String(action.payload))) {
        //state.firstNumber = state.displayValue;
        // state.displayValue = 0;
        state.operator = String(action.payload);
      }

      if (/\=/.test(String(action.payload))) {
        state.secondNumber = state.displayValue;
        switch (state.operator) {
          case "-":
            state.displayValue = String(
              parseFloat(
                String(
                  parseFloat(String(state.firstNumber)) -
                    parseFloat(String(state.secondNumber))
                ).slice(0, 16)
              )
            );
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "+":
            state.displayValue = String(
              parseFloat(
                String(
                  parseFloat(String(state.firstNumber)) +
                    parseFloat(String(state.secondNumber))
                ).slice(0, 16)
              )
            );
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "*":
            state.displayValue = String(
              parseFloat(
                String(
                  parseFloat(String(state.firstNumber)) *
                    parseFloat(String(state.secondNumber))
                ).slice(0, 16)
              )
            );
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "/":
            if (+state.secondNumber !== 0) {
              state.displayValue = String(
                parseFloat(
                  String(
                    parseFloat(String(state.firstNumber)) /
                      parseFloat(String(state.secondNumber))
                  ).slice(0, 16)
                )
              );
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

export const { changeConstructorMode, pressButton } = calcLogicSlice.actions;

export default calcLogicSlice.reducer;
