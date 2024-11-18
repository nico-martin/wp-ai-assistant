import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, TextareaControl } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import Icon from '../common/theme/svg/Icon';
import { IconName } from '../common/theme/svg/icons';
import styles from './WritingAssistantBlock.module.css';
import Llm from '../common/Llm';
import { insert } from '@wordpress/rich-text';

const Edit = ({ attributes, setAttributes, clientId }) => {
  const blockProps = useBlockProps();
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    window.setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }, []);

  const applyText = async () => {
    setAttributes({ content: text });
    setIsEditing(false);

    const llm = new Llm(
      'You are a helpful AI writing assistant. You write rather short paragraphs of text. Only text, no styling or formatting.'
    );

    // @ts-ignore
    const blockEditor = wp.data.dispatch('core/block-editor');
    // @ts-ignore
    const newBlock = wp.blocks.createBlock('core/paragraph', {
      content: '<em>generating...</em>',
    });
    blockEditor.replaceBlocks(clientId, [newBlock]);

    await llm.promptStreaming(text, (answer) => {
      blockEditor.updateBlockAttributes(newBlock.clientId, {
        content: answer,
      });
    });
  };

  return (
    <div {...blockProps}>
      {isEditing ? (
        <div className={styles.editForm}>
          <TextareaControl
            ref={textareaRef}
            label="Instriuctions"
            value={text}
            onChange={(value) => setText(value)}
            rows={3}
          />
          <Button
            className={styles.generateButton}
            isPrimary
            onClick={applyText}
          >
            <Icon
              className={styles.generateButtonIcon}
              icon={IconName.CREATION}
            />
            Generate
          </Button>
        </div>
      ) : (
        <RichText.Content tagName="p" value={attributes.content} />
      )}
    </div>
  );
};

const Save = ({ attributes }) => (
  <RichText.Content tagName="p" value={attributes.content} />
);

registerBlockType('wpaia/ai-writing-assistant', {
  title: 'AI Writing Assistant',
  category: 'text',
  icon: () => <Icon icon={IconName.CREATION} />,
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'p',
    },
  },
  edit: Edit,
  save: Save,
});
