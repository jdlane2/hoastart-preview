document.addEventListener("DOMContentLoaded", function () {
    console.log("SEO Wizard: DOMContentLoaded Triggered.");

    jQuery(function ($) {  
        console.log("SEO Wizard: Initializing after DOM Loaded...");

        let seoWizardInitialized = false;  // Prevent multiple executions

        function getPostId() {
            let postId = $('body').attr('data-elementor-post-id') || elementor?.config?.document?.id;
            
            if (!postId) {
                console.warn("SEO Wizard: Post ID not found. Trying URL method.");
                postId = new URLSearchParams(window.location.search).get('post');
            }

            console.log("SEO Wizard: Using Post ID -", postId);
            return postId;
        }

        function loadSEOWizard() {
            console.log("SEO Wizard: Sending AJAX request...");

            let postId = getPostId();
            if (!postId) {
                console.error("SEO Wizard Error: Cannot load SEO Wizard, missing post ID.");
                return;
            }

            $.ajax({
                url: window.ajaxurl || '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'load_seo_wizard_meta_box',
                    post_id: postId
                },
                success: function (response) {
                    console.log("SEO Wizard: AJAX response received successfully.");

                    if (!response || response.trim() === '' || response.includes("Error")) {
                        console.error("SEO Wizard Error: Invalid response from server.");
                        $('#seo-wizard-content').html('<p style="color: red;">Error: Invalid response from server.</p>');
                        return;
                    }

                    let container = $('.elementor-panel-inner');
                    if (container.length === 0) {
                        console.warn("SEO Wizard Warning: Target container (.elementor-panel-inner) not found.");
                        return;
                    }

                    if ($('#seo-wizard-content').length === 0) {
                        console.warn("SEO Wizard Warning: Adding SEO Wizard container inside .elementor-panel-inner.");
                        container.append('<div id="seo-wizard-content"></div>');
                    }

                    $('#seo-wizard-content').html(response);
                    $('#seo-wizard-metabox').show();

                    if (!seoWizardInitialized) {  
                        console.log("SEO Wizard: Reloading Elementor preview (only once).");
                        seoWizardInitialized = true;
                        setTimeout(() => seoWizardInitialized = false, 5000); // Prevent instant loop
                        elementor.reloadPreview();
                    }
                },
                error: function (xhr, status, error) {
                    console.error("SEO AJAX Request Failed:", status, error);
                    $('#seo-wizard-content').html(`<p style="color: red;">Error loading SEO Wizard (Server Error: ${xhr.status})</p>`);
                }
            });
        }

        function waitForElementor(attempts = 0) {
            if (typeof elementor !== 'undefined' && elementor?.config?.document?.id) {
                if (!seoWizardInitialized) {
                    console.log("SEO Wizard: Elementor is fully loaded.");
                    seoWizardInitialized = true;
                    loadSEOWizard();
                }
            } else if (attempts < 5) {  
                console.warn(`SEO Wizard: Waiting for Elementor... Attempt ${attempts + 1}`);
                setTimeout(() => waitForElementor(attempts + 1), 1000);
            } else {
                console.error("SEO Wizard Error: Elementor did not initialize after 5 attempts.");
            }
        }

        // Hook into Elementor's preview load event
        elementor.on('preview:loaded', function () {
            if (!seoWizardInitialized) {
                console.log("SEO Wizard: Elementor preview loaded, initializing...");
                waitForElementor();
            }
        });

        // Start checking for Elementor
        waitForElementor();
    });
});