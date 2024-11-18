import { registerFormatType, insert, toggleFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import {
  ToolbarButton,
  ToolbarGroup,
  Modal,
  Button,
  TextareaControl,
} from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import Icon from '../common/theme/svg/Icon';
import { IconName } from '../common/theme/svg/icons';
import styles from './ParagraphAssistant.module.css';
import Llm from '../common/Llm';

const ParagraphAssistant = ({ value, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>('');
  const [selectedText, setSelectedText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyChanges = async () => {
    const llm = new Llm(
      'You are a helpful AI assistant that rewrites the selected text. Return only text, no styling or formatting.'
    );

    setIsModalOpen(false);
    const valueWithStrikethrough = toggleFormat(value, {
      type: 'core/strikethrough',
    });

    const updatedContent = insert(
      valueWithStrikethrough,
      `\ngenerating...`,
      valueWithStrikethrough.end
    );

    onChange(updatedContent);

    await llm.promptStreaming(
      `SELECTED TEXT:\n\n${selectedText}\n\nINSTRUCTIONS\n\n${newContent}`,
      (answer) => {
        const updatedContent = insert(
          valueWithStrikethrough,
          `\n${answer}`,
          valueWithStrikethrough.end
        );

        onChange(updatedContent);
      }
    );

    setNewContent('');
  };

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={() => <Icon icon={IconName.CREATION} />}
            title="Sample output"
            onClick={() => {
              setSelectedText(value.text.slice(value.start, value.end));
              setIsModalOpen(true);
              window.setTimeout(() => textareaRef.current?.focus(), 100);
            }}
          />
        </ToolbarGroup>
      </BlockControls>
      {isModalOpen && (
        <Modal
          title="AI Assistant"
          onRequestClose={() => setIsModalOpen(false)}
        >
          <div className={styles.modal}>
            {selectedText.trim() !== '' && (
              <p>
                <b>Text you want to change</b>: <br />
                {selectedText}
              </p>
            )}
            <TextareaControl
              ref={textareaRef}
              label="Instructions:"
              value={newContent}
              onChange={(value) => setNewContent(value)}
            />
            <div className={styles.controls}>
              <Button isSecondary onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button isPrimary onClick={applyChanges}>
                Apply
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

registerFormatType('wpaia/rewriter', {
  title: 'AI Assistant',
  name: 'wpaia/rewriter',
  interactive: true,
  tagName: 'wpaia-rewriter',
  className: null,
  edit: ParagraphAssistant,
});
