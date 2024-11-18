<?php

namespace NicoMartin\WPAIAssistant;

class Plugin
{

    private static ?Plugin $instance = null;
    public string $name = '';
    public string $version = '';
    public string $prefix = '';
    public string $api_namespace = '';
    public string $file = '';
    public string $url = '';

    public Assets $Assets;

    public static function getInstance($file): Plugin
    {
        if (!isset(self::$instance)) {
            self::$instance = new Plugin();

            if (!function_exists('get_plugin_data')) {
                require_once(ABSPATH . 'wp-admin/includes/plugin.php');
            }

            $data = get_plugin_data($file);
            self::$instance->name = $data['Name'];
            self::$instance->version = $data['Version'];

            self::$instance->prefix = 'wpaia';
            self::$instance->api_namespace = 'wp-ai-assistant/v1';
            self::$instance->file = $file;
            self::$instance->url = plugin_dir_url($file);

            self::$instance->run();
        }

        return self::$instance;
    }

    public function run()
    {
        add_action('plugins_loaded', [$this, 'loadPluginTextdomain']);
    }

    /**
     * Load translation files from the indicated directory.
     */
    public function loadPluginTextdomain()
    {
        load_plugin_textdomain(
            'wpaia',
            false,
            dirname(plugin_basename(wpAIAssistant()->file)) . '/languages'
        );
    }
}
