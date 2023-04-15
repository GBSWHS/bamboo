import { Dispatch, SetStateAction } from "react"

export interface LoadingProps {
  isLoading: boolean
}

export interface ModalWays {
  name: string,
  function(): void
}

export interface ModalState {
  title: string,
  subTitle?: string | undefined,
  ways: [ModalWays],
  visible: boolean
} 

export type ModalAction = 
  | { 
    type: "show",
    title: string,
    subTitle?: string | undefined,
    ways: [ModalWays]
  }
  | {
    type: "visible", visible: boolean
  }

export interface GlobalProps {
  loading: {
    event: boolean,
    update: Dispatch<SetStateAction<boolean>>
  }
  modal: {
    event: ModalState,
    update: Dispatch<ModalAction>
  }
}
