import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, TextareaControl } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import Icon from '../common/theme/svg/Icon';
import { IconName } from '../common/theme/svg/icons';
import styles from './WritingAssistantBlock.module.css';

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
    // @ts-ignore
    const blockEditor = wp.data.dispatch('core/block-editor');
    // @ts-ignore
    const newBlock = wp.blocks.createBlock('core/paragraph', {
      content: '<em>generating...</em>',
    });
    blockEditor.replaceBlocks(clientId, [newBlock]);

    // @ts-ignore
    const writer = await self.ai.writer.create({
      tone: 'neutral',
      length: 'short',
      format: 'plain-text',
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    const stream = await writer.writeStreaming(
      text + '\n' + 'Only text, no styling or formatting.'
    );

    let answer = '';
    for (const chunk of stream) {
      answer += chunk;
      blockEditor.updateBlockAttributes(newBlock.clientId, {
        content: answer,
      });
    }

    blockEditor.updateBlockAttributes(newBlock.clientId, {
      content: answer,
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

// @ts-ignore
if (self?.ai?.writer) {
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
}
