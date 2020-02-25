<!doctype html>
<!--
                                            ..,,.
                                   .*#&@@@@@@@@@@@@&.
                            *(&@@@@@@@@@@@@@@@@@@@@@@@,
                    ./%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&,
            ,%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
          #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
         #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
        %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
       /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*             *#
       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%              (@@@%.
      /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%              (@@@@@@&
      &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*              @@@@@@@@@@&
     /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.             .@@@@@@@@@@@@@#
    .&@@@@@@@@@@@@@@@%   *(&@@@@@@@@@@@@@@@@@@&.             (@@@@@@@@@@@@@@@(
    #@@@@@@@@@@@@@@@%          *(&@@@@@@@@@@@&              (@@@@@@@@@@@@@@@@(
   .@@@@@@@@@@@@@@@.             .@@@@@@@@@@#             .%@@@@@@@@@@@@@@@@%
   #@@@@@@@@@@@@@@.             .@@@@@@@@@@,             .@@@@@@@@@@@@@@@@@@,
   @@@@@@@@@@@@@%.             (@@@@@@@@@@.             .@@@@@@@@@@@@@@@@@@&
  #@@@@@@@@@@@@(              &@@@@@@@@@#              %@@@@@@@@@@@@@@@@@@@,
 *@@@@@@@@@@@@#             .&@@@@@@@@@#              %@@@@@@@@@@@@@@@@@@@&
 &@@@@@@@@@@@&.             ,%@@@@@@@@(             .%@@@@@@@@@@@@@@@@@@@@*
.@@@@@@@@@@@@@,                 ,&@@@              ,@@@@@@@@@@@@@@@@@@@@@(
 @@@@@@@@@@@@@&                    .              *@@@@@@@@@@@@@@@@@@@@@@.
 *@@@@@@@@@@@@@@.                                #@@@@@@@@@@@@@@@@@@@@@@%
   ,@@@@@@@@@@@@@@@*                            &@@@@@@@@@@@@@@@@@@@@@@@.
     .@@@@@@@@@@@@@@@@(.                      ,@@@@@@@@@@@@@@@@@@@@@@@@%
       *@@@@@@@@@@@@@@@@@#,                  ,@@@@@@@@@@@@@@@@@@@@@@@@@.
         .@@@@@@@@@@@@@@@@@@@%.             /@@@@@@@@@@@@@@@@@@@@@@@@@*
            &@@@@@@@@@@@@@@@@@@@&,        *@@@@@@@@@@@@@@@@@@@@@@@@@@@
             .&@@@@@@@@@@@@@@@@@@@@@@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/
                %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&
                  #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
                    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,
                      (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,.
                        /@@@@@@@@@@@@@@@@@@@@/.
                          ,&@@@@@@@@@@%(,
-->

<?php
	$logo_link = null;
	$home_link = get_home_url();
	$site_url = get_site_url();
	$body_classes= array(
		'computer-pattern',
	);
?>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?> data-theme="dark-theme">
	<head>
		<?php if (is_search()) { ?>
			<meta name="robots" content="noindex, nofollow">
		<?php } ?>
		<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>">
		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
		<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class($body_classes); ?> data-theme="dark-theme">
		<header class="header dark-theme" data-theme="dark-theme">
			<div class="header-inner">
				<div class="logo-container">
					<div class="wrapper">
						<div class="wrapper-inner">
							<?php
								if ( $home_link ) :
									$logo_link = $home_link;
								else :
									$logo_link = $site_url;
								endif;
							?>
							<a href="<?php echo $logo_link; ?>" class="hero-charm-container">
								<?php include(locate_template('assets/svg/hero_charm.svg')); ?>
							</a>
						</div>
					</div>
				</div>
				<div class="portfolio-key">
					<div class="wrapper">
						<div class="flipper">
							<div class="site-info">
								<h2 class="h6 site-name">Jan<br>Michael<br>Wallace II</h2>
							</div>
							<div class="portfolio-key-legend">
								<h2 class="h6 portfolio-site-title">Site Title</h2>
								<div class="line" aria-hidden="true"></div>
								<p class="portfolio-site-address"></p>
							</div>
						</div>
						<ul class="social-menu" role="menu">
							<li class="social-item">
								<a class="social-link linkedin" href="//linkedin.com/in/jmwii1981" title="LinkedIn Profile" target="_blank">
									<!-- <i class="fab fa-linkedin-in" aria-hidden="true"></i> -->
									<?php include(locate_template('assets/svg/linkedin.svg')); ?>
									<span class="screen-reader label">LinkedIn Profile</span>
								</a>
							</li>
							<li class="social-item">
								<a class="social-link github" href="//github.com/jmwii1981" title="GitHub Portfolio" target="_blank">
									<!-- <i class="fab fa-github-alt" aria-hidden="true"></i> -->
									<?php include(locate_template('assets/svg/github.svg')); ?>
									<span class="screen-reader label">GitHub Portfolio</span>
								</a>
							</li>
							<li class="social-item">
								<a class="social-link dribbble" href="//dribbble.com/jmwii1981" title="Dribbble Portfolio" target="_blank">
									<!-- <i class="fas fa-basketball-ball" aria-hidden="true"></i> -->
									<?php include(locate_template('assets/svg/dribbble.svg')); ?>
									<span class="screen-reader label">Dribbble Portfolio</span>
								</a>
							</li>
							<li class="social-item">
								<a class="social-link resume" href="//janmichael.digital/app/uploads/2020/02/JMWresume2020.pdf" title="Download Resume" target="_blank" download="//janmichael.digital/app/uploads/2019/12/JMW-Resume-2019.pdf">
									<!-- <i class="fas fa-file" aria-hidden="true"></i> -->
									<?php include(locate_template('assets/svg/resume.svg')); ?>
									<span class="screen-reader label">Download Resume</span>
								</a>
							</li>
							<li class="social-item">
								<a class="social-link contact" href="mailto:hello@janmichael.digital" title="Contact via E-Mail">
									<!-- <i class="fas fa-paper-plane" aria-hidden="true"></i> -->
									<?php include(locate_template('assets/svg/email.svg')); ?>
									<span class="screen-reader label">Contact via E-Mail</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
