export const Minicart = async (type = null) => {
  try {
    const tracker = ga.getAll()?.[0];

    switch (type) {
      case "SHELF":
        let result = "";

        const product = document.querySelector(".adding-product");

        const brand = product.querySelector(".product-brand a").textContent;
        const bestPrice = product.querySelector(".best-price").textContent.trim();
        const productId = product.querySelector("a").getAttribute("data-product-id");
        const seller = document.querySelector("#modal-shelfadd li.sku-picked").getAttribute("data-seller");
        const sellerName = seller === "1" ? "babadotop" : seller;

        const {productDepartment, productCategory} = product.querySelector('a').dataset;
        const categorie = `${productDepartment}/${productCategory}`.toLowerCase();

        const listPrice = product.querySelector(".list-price");

        if (listPrice) {
          result = `${productId} - ${brand} - ${categorie} - ${sellerName} - ${listPrice.textContent.trim()} - ${bestPrice}`;
          tracker.send("event", "click", "addToCart Click", result);
          break;
        }

        result = `${productId} - ${brand} - ${categorie} - ${sellerName} - ${bestPrice}`;
        tracker.send("event", "click", "addToCart Click", result);
        break;

        case "PRODUCT_PAGE":
          document.querySelectorAll("a.buy-in-page-button").forEach((buyButton) => {
          buyButton.addEventListener("click", (e) => {
            let result = "";

            const sectionInfo = e.target.closest("section.section_info");

            const brand = sectionInfo.querySelector(".brandName a").textContent;
            const [_, ...categories] = sectionInfo.querySelectorAll('.bread-crumb span');
            const seller = sectionInfo.querySelector(".seller-name a").textContent;
            const bestPrice = sectionInfo.querySelector(".skuBestPrice").textContent;
            const productId = skuJson.productId;

            const categoriesNames = categories.map(categorie => categorie.textContent.toLowerCase()).join('/');

            const listPrice = sectionInfo.querySelector(".skuListPrice");

            if (listPrice) {
              result = `${productId} - ${brand} - ${categoriesNames} - ${seller} - ${listPrice.textContent.trim()} - ${bestPrice}`;
              tracker.send("event", "click", "addToCart Click", result);
              return;
            }

            result = `${productId} - ${brand} - ${categoriesNames} - ${seller} - ${bestPrice}`;
            tracker.send("event", "click", "addToCart Click", result);
            return;
          });
        });
        break;

      default:
        break;
    }
  } catch (err) {
    console.log("[Analytics - Minicart]");
  }
};
