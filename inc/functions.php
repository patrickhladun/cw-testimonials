<?php

add_action( 'plugins_loaded', 'cwt_add_additional_image_sizes', 0 );
function cwt_add_additional_image_sizes() {
    add_image_size( '600x900', 600, 900, true );
    add_image_size( '900x600', 900, 600, true );
    add_image_size( 'cwt-small', 70, 70, true );
}

add_action('admin_menu', 'cwt_testimonials_settings');
function cwt_testimonials_settings() {
    add_submenu_page(
        'edit.php?post_type=cityweb-testimonial',
        'Settings',
        'Settings',
        'manage_options',
        'testimonials-settings',
        'cwt_testimonials_settings_render' );
}

function cwt_testimonials_settings_render() {
    $background_color = '#ececec';
    $accent_color = '#757575';
    $text_color_content = '#282828';
    $text_color_name = '#282828';
    $text_color_title = '#282828';
    $text_color_details = '#282828';
    $text_color_nav = '#ffffff';

    echo '<div class="wrap"><div id="icon-tools" class="icon32"></div>';
        echo '<h2>Cityweb Testimonials Settings</h2>';
        echo '<h3>Basic shortcode to add testimonials</h3>';
        echo '<code>[cwt_testimonials]</code>';
        echo '<h3>All Options</h3>';
        $all_options = '<p><code>[cwt_testimonials ';
        $all_options .= 'id="myid" ';
        $all_options .= 'style="list" ';
        $all_options .= 'design="border" ';
        $all_options .= 'image_size="thumbnail" ';
        $all_options .= 'background_color="'.$background_color.'" ';
        $all_options .= 'accent_color="'.$accent_color.'" ';
        $all_options .= 'text_color_content="'.$text_color_content.'" ';
        $all_options .= 'text_color_name="'.$text_color_name.'" ';
        $all_options .= 'text_color_title="'.$text_color_title.'" ';
        $all_options .= 'text_color_details="'.$text_color_details.'" ';
        $all_options .= ']</code></p>';
        echo $all_options;
        echo '<h3>Options</h3>';

        echo '<p><strong>Shortcode ID</strong> - Use id="" if you need two sets of differently styles testimonials.</p>';
        echo '<code>[cwt_testimonials id="myid"]</code>';

        echo '<p><strong>Style</strong> - Available options: carousel, list. Default: carousel.</p>';
        echo '<code>[cwt_testimonials style="list"]</code>';

        echo '<p><strong>Design</strong> - Available options: default, baa, border, simple. Default: default.</p>';
        echo '<code>[cwt_testimonials design="border"]</code>';

        echo '<p><strong>Image Size</strong> - Available options: thumbnail, medium. Default: thumbnail.</p>';
        echo '<code>[cwt_testimonials image_size="thumbnail"]</code>';

        echo '<p><strong>Background colour</strong> - Use HEX values. Default: '.$background_color.'.</p>';
        echo '<code>[cwt_testimonials background_color="'.$background_color.'"]</code>';

        echo '<p><strong>Accent Colour</strong> - It is used for various elements in the designs. Use HEX values. Default: '.$accent_color.'.</p>';
        echo '<code>[cwt_testimonials accent_color="'.$accent_color.'"]</code>';

        echo '<p><strong>Content Colour</strong> - Default: '.$text_color_content.'.</p>';
        echo '<code>[cwt_testimonials text_color_content="'.$text_color_content.'"]</code>';

        echo '<p><strong>Name Colour</strong> - Default: '.$text_color_name.'.</p>';
        echo '<code>[cwt_testimonials text_color_name="'.$text_color_name.'"]</code>';

        echo '<p><strong>Title Colour</strong> - Default: '.$text_color_title.'.</p>';
        echo '<code>[cwt_testimonials text_color_title="'.$text_color_title.'"]</code>';

        echo '<p><strong>Details Colour</strong> - Default: '.$text_color_details.'.</p>';
        echo '<code>[cwt_testimonials text_color_details="'.$text_color_details.'"]</code>';

    echo '</div>';
}