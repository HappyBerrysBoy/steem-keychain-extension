import { Witness } from '@interfaces/witness.interface';
import { setErrorMessage } from '@popup/multichain/actions/message.actions';
import { setTitleContainerProperties } from '@popup/multichain/actions/title-container.actions';
import { RootState } from '@popup/multichain/store';
import { MyWitnessTabComponent } from '@popup/steem/pages/app-container/home/governance/my-witness-tab/my-witness-tab.component';
import { ProposalTabComponent } from '@popup/steem/pages/app-container/home/governance/proposal-tab/proposal-tab.component';
import { ProxyTabComponent } from '@popup/steem/pages/app-container/home/governance/proxy-tab/proxy-tab.component';
import { WitnessTabComponent } from '@popup/steem/pages/app-container/home/governance/witness-tab/witness-tab.component';
import { SteemTxUtils } from '@popup/steem/utils/steem-tx.utils';
import React, { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import 'react-tabs/style/react-tabs.scss';
import RotatingLogoComponent from 'src/common-ui/rotating-logo/rotating-logo.component';
import { Tab, TabsComponent } from 'src/common-ui/tabs/tabs.component';

const Governance = ({
  setTitleContainerProperties,
  setErrorMessage,
  activeAccount,
}: PropsFromRedux) => {
  const [isLoading, setIsLoading] = useState(true);

  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    setTitleContainerProperties({
      title: 'popup_html_governance',
      isBackButtonEnabled: true,
    });
    init();
  }, []);

  const init = async () => {
    let requestResult: Witness[] = [];

    requestResult = await SteemTxUtils.getData(
      'condenser_api.get_witnesses_by_vote',
      ['', 250],
    );
    const ranking: Witness[] = requestResult?.map((witness, index) => ({
      ...witness, // Preserve all original properties
      rank: witness.rank ?? index + 1, // Ensure ranking starts from 1
    }));

    let hasError = false;
    if (!requestResult || requestResult.length === 0) {
      hasError = true;
      setErrorMessage('popup_html_error_retrieving_witness_ranking');
    }

    const tempTabs: Tab[] = [
      {
        title: 'popup_html_witness',
        content: <WitnessTabComponent ranking={ranking} hasError={hasError} />,
      },
      {
        title: 'popup_html_proxy',
        content: <ProxyTabComponent />,
      },
      {
        title: 'popup_html_proposal',
        content: <ProposalTabComponent />,
      },
    ];
    if (
      ranking &&
      ranking.length > 0 &&
      ranking.find((witness) => witness.owner === activeAccount.name!) !==
        undefined
    ) {
      tempTabs.push({
        title: 'popup_html_my_witness_page',
        content: <MyWitnessTabComponent ranking={ranking} />,
      });
    }
    setTabs(tempTabs);

    setIsLoading(false);
  };

  return (
    <div className="governance-page" aria-label="governance-page">
      {!isLoading && <TabsComponent tabs={tabs} />}
      {isLoading && (
        <div className="rotating-logo-container">
          <RotatingLogoComponent />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { activeAccount: state.steem.activeAccount };
};

const connector = connect(mapStateToProps, {
  setTitleContainerProperties,
  setErrorMessage,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const GovernanceComponent = connector(Governance);
