export const Shelf = (tracker: any, target: HTMLElement) => {
    try {
        if (target.closest("li[layout]")) {
            const $product: HTMLLIElement = target.closest("li[layout]");
            const $productAnchor: HTMLAnchorElement = $product.querySelector("a[data-product-id]");

            if ($productAnchor !== null) {
                const isInfinityScroll: boolean = target.closest("[id^=ResultItems] li[layout]") ? true : false;
                const shelfName: string = isInfinityScroll ? `infinityscroll` : `shelf`;
                const productPage: string = target.closest("[data-page]")?.getAttribute("data-page");
                const productHref: string = $productAnchor.getAttribute("href");

                let component: string;
                if (target.matches(".shelf-images .span-hovers span")) component = "imagem";
                else if (target.closest(".product-brand")) component = "marca";
                else if (target.closest("button.btn-wishlist")) component = "wishlist";
                else if (target.closest("button.btn-share")) component = "share";
                else if (target.closest(".data a")) component = "nome";

                if (component !== undefined) {
                    let result: string;
                    result = shelfName;
                    result += !productPage ? (isInfinityScroll ? "_pg1" : "") : "_pg" + productPage;
                    result += `_${component}`;
                    result += `_${cleanHref(productHref)}`;

                    tracker.send("event", "click", "Shelf click", result);
                }
            }
        } else if (target.matches("button.buy-in-page-shelf:not(.unselected)")) {
            const href: string = target.getAttribute("data-link");
            const $selectedSize: string = target.parentElement.querySelector("li.sku-picked")?.textContent;

            const result: string = `shelf_addtocart_${$selectedSize}_${cleanHref(href)}`;

            tracker.send("event", "click", "Shelf click", result);
        }
    } catch (e) {
        console.error(`[Analytics - Shelf] `, e);
    }
};

const cleanHref = (href: string) => {
    const origin: string = window.location.origin;
    return href.indexOf(origin) > -1 ? href.substring(origin.length) : href;
};
