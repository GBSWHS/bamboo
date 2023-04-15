import { ModalAction, ModalState } from "../utils/interfaces";
import { Dispatch } from "react";

export function hideModal (update: Dispatch<ModalAction>) {
  update({ type: "visible", visible: false })
}

export default function ModalReducer(state: ModalState, action: ModalAction) {
  switch(action.type) {
    case "show": 
      return {
        title: action.title,
        subTitle: action.subTitle,
        ways: action.ways,
        visible: true
      }
    case "visible":
      return {
        ...state,
        visible: action.visible
      }
    default: 
      return {
        ...state
      }
  }
} 
