import { createContext } from 'react';
import { UserContextInterface } from '../types';

export default createContext<UserContextInterface | null>(null);
