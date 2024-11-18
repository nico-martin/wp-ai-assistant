import { registerFormatType, insert, toggleFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import {
  ToolbarButton,
  ToolbarGroup,
  Modal,
  Button,
  TextareaControl,
} from '@wordpress/components';
import { useState, useRef, Fragment } from '@wordpress/element';
import Icon from '../common/theme/svg/Icon';
import { IconName } from '../common/theme/svg/icons';
import styles from './ParagraphRewriter.module.css';
import Llm from '../common/Llm';
import isPromptApiAvailable from '../common/isPromptApiAvailable';

const ParagraphRewriter = ({ value, onChange }) => {
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
      // todo: should be italic
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
            icon={() => (
              <Icon className={styles.toolbarIcon} icon={IconName.CREATION} />
            )}
            title="AI Paragraph Rewriter"
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
              <Fragment>
                <p className={styles.contextLabel}>
                  Content you want to change
                </p>
                <code className={styles.context}>{selectedText}</code>
              </Fragment>
            )}
            <TextareaControl
              ref={textareaRef}
              label="Instructions:"
              value={newContent}
              onChange={(value) => setNewContent(value)}
              rows={2}
            />
            <div className={styles.controls}>
              <Button isSecondary onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                className={styles.rewriteButton}
                isPrimary
                onClick={applyChanges}
              >
                <Icon
                  className={styles.rewriteButtonIcon}
                  icon={IconName.CREATION}
                />
                Rewrite
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

if (isPromptApiAvailable()) {
  registerFormatType('wpaia/paragraph-rewriter', {
    title: 'AI Paragraph Rewriter',
    name: 'wpaia/paragraph-rewriter',
    interactive: true,
    tagName: 'wpaia-paragraph-rewriter',
    className: null,
    edit: ParagraphRewriter,
  });
}
