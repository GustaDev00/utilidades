import RemoveAccents from "javascripts/RemoveAccents";

export const Header = (tracker: any, target: HTMLElement) => {
    try {
        if (target.closest("header nav.header__tiny-menu a")) {
            const $anchor: HTMLAnchorElement = target.closest("header nav.header__tiny-menu a");
            const link = $anchor?.getAttribute("href");
            let result;

            if ($anchor?.querySelector("img") !== null) {
                result = `headerbanner_${RemoveAccents($anchor?.querySelector("img")?.getAttribute("alt"))}_${link}`;
            } else {
                result = `header_${RemoveAccents($anchor?.textContent)}_${link}`;
            }

            tracker.send("event", "click", "Header click", result);
        }
    } catch (e) {
        console.error(`[Analytics - Header] `, e);
    }
};
