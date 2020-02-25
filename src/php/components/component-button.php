<?php
	// Button
	if ( get_field('button') ) :
		$button = get_field('button');
	endif;
	if ( get_sub_field('button') ) :
		$button = get_sub_field('button');
	endif;

	$display_buttons = $button['display_buttons'];
	$center_buttons = $button['center_buttons'];
	$buttons = $button['button_item'];
	$button_count = 0;
?>
<?php if ( $display_buttons ) : ?>
	<?php if ( $buttons ) : ?>
		<div class="buttons<?php if ( $center_buttons ) : echo ' center'; endif; ?>">
			<?php foreach( $buttons as $button ) : ?>
				<?php
					$button_link = $buttons[$button_count]['link'];
					if ( $button_link ) :
						$button_link_url = $button_link['url'];
						$button_link_title = $button_link['title'];
						$button_link_target = $button_link['target'];

						if ($button_link_target == NULL) :
							$button_link_target = '_self';
						endif;
						echo '<a href="' . $button_link_url . '" target="' . $button_link_target . '" class="btn">' . $button_link_title . '</a>';
					endif;
					$button_count++
				?>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
<?php endif; ?>
