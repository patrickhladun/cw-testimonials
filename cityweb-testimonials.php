<?php
/**
 * @link              https://www.cityweb.dev/
 * @since             0.0.0
 *
 * Plugin Name:       Cityweb Testimonials
 * Plugin URI:        https://www.cityweb.ie/testimonials
 * Description:       Powerful testimonials plugin that allows you to display regular testimonial, before and afters and video testimonials.
 * Version:           0.1.0
 * Author:            Patrick Hladun
 * Author URI:        https://www.patrickhladun.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cityweb
 * Domain Path:       /languages
 */

define( 'CWT_VERSION', '0.1.0' );

defined( 'CWT_URL' ) || define( 'CWT_URL', plugin_dir_path( __FILE__ ) );
defined( 'CWT_DIR' ) || define( 'CWT_DIR', plugin_dir_url(__FILE__) );

if(! class_exists( 'CWT_Testimonials' ) ) :
final class CWT_Testimonials {

        public $url = CWT_URL;
        public $dir = CWT_DIR;

        private static $instance;
        public $cpt;
        public $blocks;

        /**
         * A singleton instance.
         */
        public static function instance() {
            if ( ! isset( self::$instance ) && ! ( self::$instance instanceof CWT_Testimonials ) ) {
                self::$instance = new CWT_Testimonials;
                self::$instance->includes();
                self::$instance->init();
            }

            return self::$instance;
        }

        public function __clone() {
        }

        public function __wakeup() {
        }

        /**
         * Plugin activation
         */
        static function plugin_activation() {
            flush_rewrite_rules();
        }

        /**
         * Plugin deactivation
         */
        static function plugin_deactivation() {
            flush_rewrite_rules();
        }

        public function init() {
            $this->cpt = new CWT_CPT();
            $this->blocks = new CWT_Blocks();
        }

        public function add_theme_support() {
            global $_wp_theme_features;

        }

        private function includes() {
            require_once $this->url . 'inc/functions.php';
            require_once $this->url . 'inc/class-cwt-cpt.php';
            require_once $this->url . 'inc/class-cwt-blocks.php';
        }
}
endif;

register_activation_hook( __FILE__, [ 'CWT_Testimonials', 'plugin_activation' ] );
register_deactivation_hook( __FILE__, [ 'CWT_Testimonials', 'plugin_deactivation' ] );

function CWT() {
    return CWT_Testimonials::instance();
}

CWT();
