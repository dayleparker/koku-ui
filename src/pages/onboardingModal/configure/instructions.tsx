import { Button, List, ListItem, Popover, Title } from '@patternfly/react-core';
import { QuestionCircleIcon } from '@patternfly/react-icons';
import CopyClipboard from 'components/copyClipboard';
import React from 'react';
import { InjectedTranslateProps, Interpolate } from 'react-i18next';

const ConfigureInstructions: React.SFC<InjectedTranslateProps> = ({ t }) => {
  return (
    <React.Fragment>
      <Title size="xl">{t('onboarding.configure.instructions_title')}</Title>
      <div>{t('onboarding.configure.instructions_text')}</div>
      <br />
      <List>
        <ListItem>
          {t('onboarding.configure.edit_contrab')}
          <Popover
            position="right"
            aria-label={t('onboarding.configure.explain_more_about_cron')}
            bodyContent={
              <div>
                {t('onboarding.configure.cron_user_reqs')}
                <List>
                  <ListItem>
                    <Interpolate
                      i18nKey="onboarding.configure.cron_user_req_1"
                      metering_operator={<i>metering-operator</i>}
                    />
                  </ListItem>
                  <ListItem>
                    {t('onboarding.configure.cron_user_req_2')}
                  </ListItem>
                </List>
                <Interpolate
                  i18nKey="onboarding.configure.cron_user_more"
                  sub_text={<i>ocpcollector</i>}
                  path={<b>/etc/sudoers</b>}
                />
                <br />
                <b>ocpcollector ALL=(ALL) NOPASSWD: ALL</b>
              </div>
            }
          >
            <Button variant="plain">
              <QuestionCircleIcon />
            </Button>
          </Popover>
          <CopyClipboard
            text="contrab -u <username> -e"
            aria-label={t('onboarding.configure.crontab_command')}
          />
        </ListItem>
        <ListItem>
          {t('onboarding.configure.create_entry')}
          <CopyClipboard
            text="*/45 * * * * /path/to/ocp_usage.sh --collect"
            aria-label={t('onboarding.configure.entry_description')}
          />
        </ListItem>
        <ListItem> {t('onboarding.configure.click_next')} </ListItem>
      </List>
    </React.Fragment>
  );
};

export default ConfigureInstructions;
