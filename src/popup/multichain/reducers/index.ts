import { HasFinishedSignupReducer } from '@popup/multichain/reducers/has-finished-signup.reducer';
import { LoadingReducer } from '@popup/multichain/reducers/loading.reducer';
import { MessageReducer } from '@popup/multichain/reducers/message.reducer';
import { MkReducer } from '@popup/multichain/reducers/mk.reducer';
import { ModalReducer } from '@popup/multichain/reducers/modal.reducer';
import { NavigationReducer } from '@popup/multichain/reducers/navigation.reducer';
import { TitleContainerReducer } from '@popup/multichain/reducers/title-container.reducer';
import steemReducers from '@popup/steem/reducers';
import { combineReducers } from 'redux';

export default combineReducers({
  mk: MkReducer,
  message: MessageReducer,
  navigation: NavigationReducer,
  loading: LoadingReducer,
  titleContainer: TitleContainerReducer,
  steem: steemReducers,
  hasFinishedSignup: HasFinishedSignupReducer,
  modal: ModalReducer,
});
