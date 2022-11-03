import RemoveAccents from "javascripts/RemoveAccents";

export const CloudWords = (tracker: any, target: HTMLAnchorElement) => {
    try {
        const $cloudWordsLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
            "section.socialCommerceCloudWords a"
        );

        if ($cloudWordsLinks.length > 0) {
            if (target.matches("section.socialCommerceCloudWords a")) {
                const position: number = Object.values($cloudWordsLinks).indexOf(target);
                const targetText: string = target.innerText;
                const href: string = target.getAttribute("href");
                const result: string = `cloudwords_p${position + 1}_${RemoveAccents(targetText)}_${href}`;

                tracker.send("event", "click", "Cloudwords click", result);
            }
        }
    } catch (e) {
        console.error(`[Analytics - CloudWords] `, e);
    }
};
