import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
console.log('[DEBUG] useAppSelector initialized');
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;