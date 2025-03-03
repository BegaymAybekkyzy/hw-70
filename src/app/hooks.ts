import { AppDispatch, RootState } from "./store.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
