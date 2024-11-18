import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { Button, ButtonGroup } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import Llm from '../common/Llm';
import Icon from '../common/theme/svg/Icon';
import { IconName } from '../common/theme/svg/icons';
import styles from './TitleSuggestion.module.css';
import isPromptApiAvailable from '../common/isPromptApiAvailable';

const TitleSuggestion = () => {
  const [titles, setTitles] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <PluginDocumentSettingPanel
      name="wpaia-title-suggestion"
      title="AI Assistant"
    >
      {/*@ts-ignore*/}
      <Fragment>
        <ButtonGroup>
          <Button
            className={styles.generateButton}
            disabled={loading}
            onClick={async () => {
              setTitles([]);
              setLoading(true);
              try {
                // @ts-ignore
                const content = wp.data
                  .select('core/editor')
                  .getCurrentPost()
                  .content.toString()
                  .replace(/<!--.*?-->/gs, '');

                const llm = new Llm(
                  'You are a helpful AI assistant that gives 5 suggestions for titles based on the content of a blog. Always return only the titles separated by a new line and without any styling or formatting.'
                );

                const response = await llm.prompt('POST:\n\n' + content);
                console.log(response);

                const suggestions = response.split('\n').filter(Boolean);

                setTitles(suggestions);
                setLoading(false);
              } catch (e) {
                console.error(e);
                alert('Error parsing response');
                setLoading(false);
              }
            }}
          >
            <Icon
              className={styles.generateButtonIcon}
              icon={IconName.CREATION}
            />{' '}
            {loading ? 'generating...' : 'Generate title suggestions'}
          </Button>
        </ButtonGroup>
        <ul className={styles.titleList}>
          {titles.map((title) => (
            <li className={styles.titleListItem}>
              <button
                className={styles.titleListButton}
                onClick={() => {
                  // @ts-ignore
                  wp.data.dispatch('core/editor').editPost({ title });
                }}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </Fragment>
    </PluginDocumentSettingPanel>
  );
};

if (isPromptApiAvailable()) {
  registerPlugin('wpaia-title-suggestion', {
    render: TitleSuggestion,
  });
}
