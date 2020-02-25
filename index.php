<?php get_header(); ?>
	<?php if ( is_front_page() ) : ?>
		<div class="front-page">
			<?php include(locate_template('src/php/sections/section-portfolio.php')); ?>
			<?php include(locate_template('src/php/sections/section-hero.php')); ?>
	<?php else: ?>
		<div class="interior-page">
	<?php endif; ?>
		<?php if ( have_rows( 'sections' ) ) : ?>
			<?php while ( have_rows( 'sections' ) ) : the_row(); ?>
				<?php $view_type = get_row_layout(); ?>
				<?php include(locate_template('src/php/sections/section-' . $view_type . '.php')); ?>
			<?php endwhile; ?>
		<?php endif; ?>
	</div>
<?php get_footer(); ?>
