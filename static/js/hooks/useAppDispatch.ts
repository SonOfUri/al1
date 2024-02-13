// src/hooks/useAppDispatch.ts

import { TAppDispatch } from "@store/index";
import { useDispatch } from "react-redux";

// Use this hook when you need to handle thunks
export const useAppDispatch = () => useDispatch<TAppDispatch>();
