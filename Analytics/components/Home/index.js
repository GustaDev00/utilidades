import RemoveAccents from "javascripts/RemoveAccents";

const Home = (tracker, target) => {
    try {
        if (document.body.id === "home-page") {
            const selectors = ["#home-page .box-banner a img", "#home-page .socialCommerceStoriesView a"];

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

                    tracker.send("event", "click", "Banner click", result);
                    break;
                }
            }
        }
    } catch (e) {
        console.error(`[Analytics - Home] `, e);
    }
};

export default Home;
