import { forgetMk } from '@popup/multichain/actions/mk.actions';
import { resetNav } from '@popup/multichain/actions/navigation.actions';
import { RootState } from '@popup/multichain/store';
import { WitnessVotingSectionComponent } from '@popup/steem/pages/app-container/home/voting-section/witness-voting-section/witness-voting-section.component';
import { Theme, useThemeContext } from '@popup/theme.context';
import { Screen } from '@reference-data/screen.enum';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { SVGIcons } from 'src/common-ui/icons.enum';
import { MenuComponent } from 'src/common-ui/menu/menu.component';
import { SVGIcon } from 'src/common-ui/svg-icon/svg-icon.component';
import SettingsMenuItems from './settings-main-page-menu-items';

const SettingsMainPage = ({ forgetMk, resetNav }: PropsFromRedux) => {
  const { toggleTheme, theme } = useThemeContext();

  const goToDiscord = () => {
    chrome.tabs.create({ url: 'https://discord.gg/Bsf98vMg6U' });
  };
  const goToSteemPro = () => {
    chrome.tabs.create({ url: 'https://steempro.com/@faisalamin' });
  };
  const goToTwitter = () => {
    chrome.tabs.create({ url: 'https://twitter.com/faisalamin9696' });
  };
  const logout = () => {
    resetNav();
    forgetMk();
  };
  const getIcon = () =>
    theme === Theme.DARK ? SVGIcons.MENU_THEME_LIGHT : SVGIcons.MENU_THEME_DARK;
  return (
    <div
      className="settings-main-page"
      data-testid={`${Screen.SETTINGS_MAIN_PAGE}-page`}>
      {/* <div className="love-text">
        {chrome.i18n.getMessage('html_popup_made_with_love_by_faisalamin')}
      </div> */}
      <MenuComponent
        title="popup_html_settings"
        isBackButtonEnable={true}
        rightAction={{
          icon: getIcon(),
          callback: toggleTheme,
          className: 'menu-toggle-theme',
        }}
        showDetachWindowOption
        isCloseButtonDisabled
        menuItems={SettingsMenuItems(logout)}></MenuComponent>
      <WitnessVotingSectionComponent />
      <div className="link-panel">
        <SVGIcon
          className="network-icon"
          icon={SVGIcons.MENU_BOTTOM_BAR_DISCORD}
          onClick={goToDiscord}
          hoverable
        />
        <SVGIcon
          className="network-icon"
          icon={SVGIcons.MENU_BOTTOM_BAR_STEEM}
          onClick={goToSteemPro}
          hoverable
        />
        <SVGIcon
          className="network-icon"
          icon={SVGIcons.MENU_BOTTOM_BAR_TWITTER}
          onClick={goToTwitter}
          hoverable
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const connector = connect(mapStateToProps, {
  forgetMk,
  resetNav,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SettingsMainPageComponent = connector(SettingsMainPage);
