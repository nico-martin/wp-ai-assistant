<?php

/*
Plugin Name: WP AI Assistant
Plugin URI:
Description: Your AI Assistant for WordPress that works completely on device
Author: Nico Martin - mail@nico.dev
Author URI: https://nico.dev
Version: 0.0.1
Text Domain: wpaia
Domain Path: /languages
Requires PHP: 8.1
Tested up to: 6.7
License: MIT
License URI:
*/

defined('ABSPATH') or die();

add_action('init', function () {
    load_plugin_textdomain('wpaia', false, basename(dirname(__FILE__)) . '/languages');
});

require_once 'src/Helpers.php';
require_once 'src/Plugin.php';
require_once 'src/Assets.php';

function wpAIAssistant(): \NicoMartin\WPAIAssistant\Plugin
{
    return NicoMartin\WPAIAssistant\Plugin::getInstance(__FILE__);
}

wpAIAssistant()->Assets = new NicoMartin\WPAIAssistant\Assets();
wpAIAssistant()->Assets->run();