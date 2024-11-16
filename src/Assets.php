<?php

namespace NicoMartin\WPAIAssistant;

class Assets
{
    public function run()
    {
        add_action('wp_head', [$this, 'uiJsVars']);
        add_action('wp_enqueue_scripts', [$this, 'addAssets']);
        add_action('admin_enqueue_scripts', [$this, 'addAdminAssets']);
    }

    public function uiJsVars()
    {
        $defaults = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'homeUrl' => trailingslashit(get_site_url()),
            'pluginPrefix' => wpAIAssistant()->prefix,
            'generalError' => __('An unexpected error occured', 'wpaia'),
            'restBase' => trailingslashit(get_rest_url()),
            'restPluginBase' => trailingslashit(get_rest_url() . wpAIAssistant()->api_namespace),
            'restPluginNamespace' => wpAIAssistant()->api_namespace,
        ];
        $vars = json_encode(apply_filters('wpaia/Assets/FooterJS', $defaults));
        echo '<script>' . PHP_EOL;
        echo "var wpaiaUiJsVars = {$vars};";
        echo '</script>' . PHP_EOL;
    }

    public function addAssets()
    {
        /*
        $script_version = wpAIAssistant()->version;
        $dir_uri        = trailingslashit(plugin_dir_url(wpAIAssistant()->file));

        wp_enqueue_style(
            wpAIAssistant()->prefix . '-ui-installprompt',
            $dir_uri . 'assets/dist/ui-installprompt.css',
            [],
            $script_version
        );

        wp_enqueue_script(
            wpAIAssistant()->prefix . '-ui-installprompt',
            $dir_uri . 'assets/dist/ui-installprompt.js',
            [],
            $script_version,
            true
        );
        */
    }

    public function addAdminAssets()
    {
        $script_version = wpAIAssistant()->version;
        $dir_uri = trailingslashit(plugin_dir_url(wpAIAssistant()->file));

        wp_enqueue_media();
        wp_enqueue_style('wp-components');

        //wp_enqueue_script('react', $dir_uri . 'assets/react.production.min.js', [], '17', true);
        //wp_enqueue_script('react-dom', $dir_uri . 'assets/react-dom.production.min.js', ['react'], '17', true);

        /*
         * we can't use preact if we want to use wp-components
        wp_enqueue_script('preact', $dir_uri . 'assets/preact/preact.min.js', [], '10.5.12', true);
        wp_enqueue_script('preact-hooks', $dir_uri . 'assets/preact/preact-hooks.min.js', ['preact'], '10.5.12', true);
        wp_enqueue_script(
            'preact-compat',
            $dir_uri . 'assets/preact/preact-compat.min.js',
            ['preact', 'preact-hooks'],
            '10.5.12',
            true
        );*/

        wp_enqueue_style(
            wpAIAssistant()->prefix . '-roboto',
            $dir_uri . 'assets/fonts/roboto.css',
            [],
            $script_version
        );

        wp_enqueue_style(
            wpAIAssistant()->prefix . '-admin-style',
            $dir_uri . 'assets/dist/admin.css',
            [wpAIAssistant()->prefix . '-roboto'],
            $script_version
        );

        wp_enqueue_script(
            wpAIAssistant()->prefix . '-admin-script',
            $dir_uri . 'assets/dist/admin.js',
            [
                'react',
                'react-dom',
                'wp-components',
                'wp-i18n',
            ],
            $script_version,
            true
        );

        /**
         * Admin Footer JS
         */

        $defaults = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'homeUrl' => trailingslashit(get_site_url()),
            'pluginUrl' => trailingslashit(plugin_dir_url(wpAIAssistant()->file)),
            'pluginPrefix' => wpAIAssistant()->prefix,
            'generalError' => __('An unexpected error occured', 'wpaia'),
            'restBase' => trailingslashit(get_rest_url()),
            'restPluginBase' => trailingslashit(get_rest_url() . wpAIAssistant()->api_namespace),
            'restPluginNamespace' => wpAIAssistant()->api_namespace,
            'pluginStrings' => apply_filters('wpaia/PluginStrings', []),
            'nonce' => wp_create_nonce('wp_rest'),
            'multisite' => is_multisite(),
        ];

        $vars = json_encode(apply_filters('wpaia/Assets/AdminFooterJS', $defaults));

        wp_add_inline_script(wpAIAssistant()->prefix . '-admin-script', "var wpaiaJsVars = {$vars};", 'before');
    }
}
