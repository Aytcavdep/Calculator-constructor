import { createSlice } from "@reduxjs/toolkit";

export const calcItemSlice = createSlice({
  name: "calc_item",
  initialState: {
  //   calcButton: [
  //     {
  //       id: 1,
  //       title: "display",
  //       disabled: false,
  //       draggable: true,
  //       items: [{ id: 1, title: "display", value: 0 }],
  //     },
  //     {
  //       id: 2,
  //       title: "operators",
  //       disabled: false,
  //       draggable: true,
  //       items: [
  //         { id: 1, title: "divide", value: "/" },
  //         { id: 2, title: "multiply", value: "*" },
  //         { id: 3, title: "subtract", value: "-" },
  //         { id: 4, title: "sum", value: "+" },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: "numeric_keypad",
  //       disabled: false,
  //       draggable: true,
  //       items: [
  //         { id: 1, title: 7, value: 7 },
  //         { id: 2, title: 8, value: 8 },
  //         { id: 3, title: 9, value: 9 },
  //         { id: 4, title: 4, value: 4 },
  //         { id: 5, title: 5, value: 5 },
  //         { id: 6, title: 6, value: 6 },
  //         { id: 7, title: 1, value: 1 },
  //         { id: 8, title: 2, value: 2 },
  //         { id: 9, title: 3, value: 3 },
  //         { id: 10, title: 0, value: 0 },
  //         { id: 11, title: "point", value: "." },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       title: "calculate",
  //       disabled: false,
  //       draggable: true,
  //       items: [{ id: 1, title: "calculate", value: "=" }],
  //     },
  //   ],
  //   constructor: [],
  // },
  secondNumber: "",
  operator: "",
  result: "",
  isConstructorMode: true,
  reducers: {
    isConstructorModeChange (state) {
      state.isConstructorMode = !state.isConstructorMode
    },
    unActiveItems(state, action) {
      state.calcButton.map((items) =>
        items.id === action.payload.id ? (items.draggable = "false") : items
      );
    },
    setDeleteIndex(state, action) {
      state.deleteIndex = action.payload;
    },
    setConstructorMode(state, action) {
      state.constructorMode = !state.constructorMode;
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },
    addConstructorItem(state, action) {
      if (action.payload.title === "display") {
        if (state.deleteIndex !== -1) {
          state.constructor.splice(state.deleteIndex, 1);
          state.constructor.unshift(action.payload);
        } else {
          state.constructor.unshift(action.payload);
        }
      } else if (
        state.currentIndex !== -1 &&
        state.currentIndex !== undefined
      ) {
        if (state.deleteIndex !== -1) {
          state.constructor.splice(state.deleteIndex, 1);
          state.constructor.splice(state.currentIndex + 1, 0, action.payload);
          state.currentIndex = -1;
        } else {
          state.constructor.splice(state.currentIndex + 1, 0, action.payload);
          state.currentIndex = -1;
        }
      } else if (state.deleteIndex !== -1) {
        state.constructor.splice(state.deleteIndex, 1);
        state.constructor.splice(state.currentIndex + 1, 0, action.payload);
        state.currentIndex = -1;
      } else {
        state.constructor.push(action.payload);
        state.currentIndex = -1;
      }
    },
    pressButton(state, action) {
      if (/\d/.test(action.payload)) {
        if (state.constructor[0].items[0].value === 0) {
          state.constructor[0].items[0].value = action.payload;
        } else {
          state.constructor[0].items[0].value += "" + action.payload;
        }
      }
      if (
        /\./.test(action.payload) &
        !/\./.test(state.constructor[0].items[0].value)
      ) {
        state.constructor[0].items[0].value += "" + action.payload;
      }

      if (/\+|-|\*|\//.test(action.payload)) {
        state.firstNumber = state.constructor[0].items[0].value;
        state.constructor[0].items[0].value = 0;
        state.operator = action.payload;
      }

      if (/\=/.test(action.payload)) {
        state.secondNumber = state.constructor[0].items[0].value;
        switch (state.operator) {
          case "-":
            state.constructor[0].items[0].value = +(
              parseFloat(state.firstNumber) - parseFloat(state.secondNumber)
            ).toFixed(10);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "+":
            state.constructor[0].items[0].value = +(
              parseFloat(state.firstNumber) + parseFloat(state.secondNumber)
            ).toFixed(10);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "*":
            state.constructor[0].items[0].value = +(
              parseFloat(state.firstNumber) * parseFloat(state.secondNumber)
            ).toFixed(10);
            state.firstNumber = 0;
            state.secondNumber = 0;
            state.operator = "";
            break;
          case "/":
            if (+state.secondNumber !== 0) {
              state.constructor[0].items[0].value = +(
                parseFloat(state.firstNumber) / parseFloat(state.secondNumber)
              ).toFixed(10);
              state.firstNumber = 0;
              state.secondNumber = 0;
              state.operator = "";
            } else {
              state.constructor[0].items[0].value = "Не определено";
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
}});

export const {
  isConstructorModeChange,
  pressButton,
  addConstructorItem,
  filtrConstructorLine,
  addConstructorLine,
  setCurrentIndex,
  setDeleteIndex,
  setConstructorMode,
  unActiveItems,
} = calcItemSlice.actions;

export default calcItemSlice.reducer;
