import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
//import { Button, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import Llm from '../common/Llm';

declare const wp: any;

const { Button, ButtonGroup } = wp.components;

const AITitleSuggestion = () => {
  const [titles, setTitles] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <PluginDocumentSettingPanel
      name="wpaia-title-suggestion"
      title="AI Assistant"
    >
      <ButtonGroup style={{ width: '100%' }}>
        <Button
          style={{ width: '100%' }}
          disabled={loading}
          onClick={async () => {
            setTitles([]);
            setLoading(true);
            try {
              const content = wp.data
                .select('core/editor')
                .getCurrentPost()
                .content.replace(/<!--.*?-->/gs, '');

              console.log(content);
              const llm = new Llm(
                'You are a helpful AI assistant that gives 5 suggestions for titles based on the content of a blog. Always return only the titles separated by a new line.'
              );

              const response = await llm.prompt('Blogpost:\n\n' + content);
              console.log(response);

              const suggestions = response.split('\n').filter(Boolean);
              console.log(suggestions);

              setTitles(suggestions);
              setLoading(false);
            } catch (e) {
              console.error(e);
              alert('Error parsing response');
              setLoading(false);
            }
          }}
        >
          {loading ? 'generating...' : 'Generate Title suggestions'}
        </Button>
      </ButtonGroup>
      <ul style={{ marginTop: '1em' }}>
        {titles.map((title) => (
          <li
            style={{
              borderTop: '1px solid #e0e0e0',
              padding: '0.75em 0',
              marginBottom: '0',
            }}
          >
            <button
              style={{
                width: '100%',
                textAlign: 'left',
                padding: 0,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() =>
                wp.data.dispatch('core/editor').editPost({ title })
              }
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </PluginDocumentSettingPanel>
  );
};

registerPlugin('wpaia-title-suggestion', {
  render: AITitleSuggestion,
});
