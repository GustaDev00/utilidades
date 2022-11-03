export const Product = (tracker, target) => {
  try {
    if (document.body.id === 'product-page') {
        const selectors = [
          "div.plugin-preco div.freeShippingInApp a",
          "div.plugin-preco div.freeShippingInApp a section#inside strong",
          "div.plugin-preco div.freeShippingInApp a svg",
        ];

      for (const selector of selectors) {
        if (target.matches(selector)) {
          const appFlag = target.closest('a');

          const result = `${appFlag}_${window.location.pathname}`;
          
          tracker.send("event", "click", "App Flag Click", result);
          break;
        }
      }
    }
  } catch (e) {
    console.error(`[Analytics - Product] `, e);
  }
};
