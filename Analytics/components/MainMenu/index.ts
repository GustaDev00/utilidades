import RemoveAccents from "javascripts/RemoveAccents";

export const MainMenu = (tracker: any, target: HTMLElement) => {
    try {
        if (target.closest("#slide-sidebar nav.department-menu-nav a")) {
            const $anchor: HTMLAnchorElement = target.closest("#slide-sidebar nav.department-menu-nav a");
            const textContent = $anchor.textContent;
            const link = $anchor?.getAttribute("href");

            const result = `mainmenu_${RemoveAccents(textContent)}_${link}`;

            tracker.send("event", "click", "MainMenu click", result);
        }
    } catch (e) {
        console.error(`[Analytics - MainMenu] `, e);
    }
};
