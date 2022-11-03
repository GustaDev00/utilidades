import RemoveAccents from "javascripts/RemoveAccents";

const SocialCommerce = (tracker, target) => {
    try {
        if (document.body.id === "home-page") {
            const selectors = ["#home-page .section-secondary-banners .box-banner a img", ".socialCommerceStories a", ".socialCommerceTarjaBanner a img"];

            for (const selector of selectors) {
                if (target.matches(selector)) {
                    const $section = target.closest("section");
                    const $sectionBanners = $section.querySelectorAll(selector);
                    const $link = target.closest("a").href;

                    const sectionClassName = $section.classList[0];
                    const position = Object.values($sectionBanners).indexOf(target);
                    const alt = target.getAttribute("alt") || target.querySelector("img").getAttribute("alt");
                    const href = $link.replace(window.location.origin, "");

                    const result = `${RemoveAccents(sectionClassName)}_p${position + 1}_${RemoveAccents(alt)}_${href}`;

                    tracker.send("event", "click", "social commerce", result);
                    break;
                }
            }
        }
    } catch (e) {
        console.error(`[Analytics - SocialCommerce] `, e);
    }
};

export default SocialCommerce;
