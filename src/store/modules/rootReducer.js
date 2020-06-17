import { combineReducers } from "redux";

import auth from './auth/reducer';
import usuario from './usuario/reducer';
import conteudo from './conteudo/reducer';

export default combineReducers({ auth, usuario, conteudo });
