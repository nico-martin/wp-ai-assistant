<?php

namespace NicoMartin\WPAIAssistant;

class Assets
{
    public function run()
    {
        add_action('enqueue_block_editor_assets', [$this, 'addEditorAssets']);
    }
    public function addEditorAssets()
    {
        $script_version = wpAIAssistant()->version;
        $dir_uri = trailingslashit(plugin_dir_url(wpAIAssistant()->file));

        wp_enqueue_script(
            wpAIAssistant()->prefix . '-editor-assets-script',
            $dir_uri . 'assets/dist/editorAssets.js',
            [ 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-i18n' ],
            $script_version,
            true
        );
    }
}
