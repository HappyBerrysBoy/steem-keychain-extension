import { RootState } from '@popup/multichain/store';
import AccountSubMenuItems from '@popup/steem/pages/app-container/settings/accounts/account-sub-menu-items';
import { Screen } from '@reference-data/screen.enum';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MenuComponent } from 'src/common-ui/menu/menu.component';

const AccountSubMenu = ({}: PropsFromRedux) => {
  return (
    <div
      data-testid={`${Screen.SETTINGS_ACCOUNTS}-page`}
      className="settings-account-sub-menu-page">
      <MenuComponent
        title="popup_html_accounts"
        isBackButtonEnable={true}
        menuItems={AccountSubMenuItems}></MenuComponent>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const AccountSubMenuComponent = connector(AccountSubMenu);
