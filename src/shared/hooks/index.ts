import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import type {} from "redux-thunk/extend-redux";import { AppDispatch, RootState } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = dispatchHook;